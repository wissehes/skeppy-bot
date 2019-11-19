const Discord = require('discord.js');

exports.run = (client, message, args) => {
  //ignore dm's
  if (message.channel.type === 'dm')
      return message.channel.send(`You need to be in a server to use this command.`);

var npSettings = client.npSettings
if(args[0]){
  if([client.config.ownerID, client.config.adminID].some(a => message.author.id == a) || message.member.roles.some(r=>["DJ", "dj", "DeeJay", "deejay"].includes(r.name))){
    var guildId = message.guild.id
    if(args[0] == "off"){
      npSettings.set(guildId, false, 'np')
      message.channel.send(`Now playing messages are now turned **off**`)
    } 
    if (args[0] == "on"){
      npSettings.set(guildId, true, 'np')
      message.channel.send(`Now playing messages are now turned **on**`)
    }
  } else {
    return message.react('🚫') && message.channel.send('You need the `DJ` role to do that!');
  }
  return;
}
  var queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.channel.send(`No music is playing!`);
  let npMsgs;
  if(client.npSettings.get(message.guild.id, "np")){
    npMsgs = `On`
  } else (
    npMsgs = `Off`
  )
  //https://stackoverflow.com/questions/56918073/progress-bar-for-leveling-system
  const showBar = xp => {
    var currentPos = client.player.get(message.guild.id).state.position / 10000
    var totalTime = queue[0].info.length / 10000
    const currentLevel = Math.floor(currentPos / totalTime);
    const progress = (currentPos % 1000) / totalTime;
    const progressOutOf35 = Math.round(progress * totalTime);
    
    const x = "□";
    const barStr = `[${'■'.repeat(progressOutOf35)}${'□'.repeat(totalTime - progressOutOf35)}]`;
    return barStr;
    //console.log(barStr + ', currntly at level ' + currentLevel);
  };
  let time;
  if(queue[0].info.length >= 9223372036854776000){
    time = `Live`
  } else {
    time = `[${client.getYTLength(client.player.get(message.guild.id).state.position)}] ${showBar()} [${client.getYTLength(queue[0].info.length)}]`
  }
  message.channel.send(new Discord.RichEmbed()
    .setColor("RED")
    .setAuthor(`Now playing`)
    .setTitle(`${queue[0].info.author} - ${queue[0].info.title}`)
    .setThumbnail(`https://i.ytimg.com/vi/${queue[0].info.identifier}/hqdefault.jpg`)
    .setURL(queue[0].info.uri)
    .setDescription(time));
}
