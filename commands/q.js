const Discord = require('discord.js');

exports.run = (client, message, args) => {
  var queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.channel.send(`No music is playing!`);
    
  var list = queue.map((a, i) => `**${i + 1}**. ${a.info.author ? `[**${a.info.title}**](${a.info.uri}) by **${a.info.author}**` : `Unknown`} (${client.getYTLength(a.info.length)})`);
  
  if(list.length > 15)
    list.splice(14, list.length);

  var embed = new Discord.RichEmbed();
  embed.setColor('RED').setTitle(`Queue for **${message.guild.name}**`);

  embed.setDescription(list.join('\n'));
  if(client.musicSettings[message.guild.id])
    embed.addField('Current Settings', `**Loop**: ${client.musicSettings[message.guild.id].loop}\n**Shuffle**: ${client.musicSettings[message.guild.id].shuffle}`);
  else
    embed.addField('Current Settings', `**Loop**: 0\n**Shuffle**: false`);
  message.channel.send(embed);
}