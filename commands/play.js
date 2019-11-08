// Legacy (discord.js-musicbot-addon)

/*exports.run = (client, message, args) => {
  const searchstring = args.join(" ");
  if (searchstring.includes(".mp3") && message.member.voiceChannel){
      const connection = message.member.voiceChannel.join().then(connection => {
      const dispatcher = connection.playStream(searchstring);
      message.react("✅");
      });
    } else {
    client.music.bot.playFunction(message, searchstring);
  }
}*/

// Lavalink version

const axios = require('axios');
const Discord = require('discord.js');

const defaultRegions = {
  asia: ["sydney", "singapore", "japan", "hongkong"],
  eu: ["london", "frankfurt", "amsterdam", "russia", "eu-central", "eu-west"],
  us: ["us-central", "us-west", "us-east", "us-south", "brazil"]
};


exports.run = async (client, message, args) => {
  var config = client.config;
  async function getSongs(search) {
    return new Promise(async (resolve, rej) => {
      try {
        const res = await axios.get(`${config.lavalink.searchnode.address ? config.lavalink.searchnode.address : `https://${config.lavalink.searchnode.host}:${config.lavalink.searchnode.port}`}/loadtracks?identifier=${encodeURIComponent(search)}`, {
          headers: {
            Authorization: config.lavalink.searchnode.password
          }
        });
        resolve(res.data.tracks);
      } catch (e) {
        //message.channel.send(`Track not found.`);
        resolve(e);
      }
    });
  }
  
  function getIdealHost(bot, region) {
    region = getRegion(bot, region);
    const foundNode = bot.player.nodes.find(node => node.ready && node.region === region);
    if (foundNode) return foundNode.host;
    return bot.player.nodes.first().host;
  }
  
  function getRegion(bot, region) {
    region = region.replace("vip-", "");
    for (const key in defaultRegions) {
      const nodes = bot.player.nodes.filter(node => node.connected && node.region === key);
      if (!nodes) continue;
      for (const id of defaultRegions[key]) {
        if (id === region || region.startsWith(id) || region.includes(id)) return key;
      }
    }
    return "asia";
  }
  var bot = client; // Shush.
  var msg = message; // Also shush
  const betterArgs = args.join(' ').trim();
  let canPlay = false;
  await message.channel.send(`Hold on...`);
  if(!msg.member.voiceChannelID)
    return message.channel.send(`You're not in a voice channel!`);

  if(bot.player.get(message.guild.id) && msg.member.voiceChannelID !== bot.player.get(message.guild.id).channel)
    return message.channel.send(`You're not in the playing voice channel!`);

  if(!betterArgs && !bot.player.get(message.guild.id))
    return message.channel.send(`You didn't give anything to play!`);

  var queue = bot.getQueue(message.guild.id);
  var track = await getSongs(betterArgs.startsWith(`http`) ? betterArgs : `ytsearch:${betterArgs}`);
  if(track instanceof Error)
    return message.channel.send(`Track search failed with error \n\`\`\`xl\n${e.toString()}\n\`\`\``);
  const urlParams = new URLSearchParams(args.join(' '));
  const myParam = parseInt(urlParams.get('index'));
  if(!track[0]) return message.channel.send(`No results found.`);
  if(!queue[0]) canPlay = true;
  if(urlParams.get('list') && myParam) {
    track = track.splice(myParam - 1, track.length);
    track.forEach((cr, i) => {
      queue.push(cr);
    });
  } else if(urlParams.get('list')) {
    track.forEach((cr) => {
      queue.push(cr);
    });
  } else {
    queue.push(track[0]);
  }

  message.channel.send(`:musical_note: Added ${urlParams.get('list') ? "playlist" : "song"} to queue!`, new Discord.RichEmbed()
  .setColor("RED")
  .setTitle(track[0].info.title)
  .setThumbnail(`https://i.ytimg.com/vi/${track[0].info.identifier}/hqdefault.jpg`)
  .setDescription(`
• **Author**: ${track[0].info.author}
• **URL**: [${track[0].info.uri}](${track[0].info.uri})
• **Length**: ${bot.getYTLength(track[0].info.length)}
  `));

  if(canPlay) {
    var theHost = getIdealHost(bot, message.guild.region);
    const player = await bot.player.join({
      guild: message.guild.id,
      channel: message.member.voiceChannelID,
      host: theHost
    });
    bot.player.get(message.guild.id).node = bot.player.nodes.get(theHost);
    bot.execQueue(message, queue, player);
  }
}