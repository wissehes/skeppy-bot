const Discord = require('discord.js');

exports.run = (client, message, args) => {
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
  message.channel.send(`:musical_note: Now playing:`, new Discord.RichEmbed()
    .setColor("RED")
    .setTitle(queue[0].info.title)
    .setThumbnail(`https://i.ytimg.com/vi/${queue[0].info.identifier}/hqdefault.jpg`)
    .setDescription(`
• **Author**: ${queue[0].info.author}
• **URL**: [${queue[0].info.uri}](${queue[0].info.uri})
• **Time**: [${client.getYTLength(client.player.get(message.guild.id).state.position)}/${client.getYTLength(queue[0].info.length)}]
• **Song Updates:** ${npMsgs}
  `));
}
