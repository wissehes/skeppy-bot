const Discord = require('discord.js');

exports.run = (client, message, args) => {
  var queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.channel.send(`No music is playing!`);

  message.channel.send(`:musical_note: Now playing:`, new Discord.RichEmbed()
    .setColor("RED")
    .setTitle(queue[0].info.title)
    .setThumbnail(`https://i.ytimg.com/vi/${queue[0].info.identifier}/hqdefault.jpg`)
    .setDescription(`
• **Author**: ${queue[0].info.author}
• **URL**: [${queue[0].info.uri}](${queue[0].info.uri})
• **Length**: ${client.getYTLength(queue[0].info.length)}
  `));
}