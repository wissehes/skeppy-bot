const Discord = require('discord.js');

exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
    return message.channel.send(`You need to be in a server to use this command.`);
    
  var queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.channel.send(`No music is playing!`);
    
  var list = queue.map((a, i) => `**${i + 1}**. ${a.info.author ? `[**${a.info.title}**](${a.info.uri}) by **${a.info.author}**` : `Unknown`} (${client.getYTLength(a.info.length)})`);
  
  if(list.length > 15)
    list.splice(14, list.length);

    let npMsgs;
    if(client.npSettings.get(message.guild.id, "np")){
      npMsgs = `On`
    } else (
      npMsgs = `Off`
    )

  var embed = new Discord.RichEmbed();
  embed.setColor('RED').setTitle(`Queue for **${message.guild.name}**`);

  embed.setDescription(list.join('\n'));
  if(client.musicSettings[message.guild.id])
    embed.addField('Current Settings', `**Loop**: ${client.musicSettings[message.guild.id].loop}\n**Shuffle**: ${client.musicSettings[message.guild.id].shuffle}\n **Now playing messages**: ${npMsgs}`);
  else
    embed.addField('Current Settings', `**Loop**: 0\n**Shuffle**: false\n **Song updates**: ${npMsgs}`);
  message.channel.send(embed);
}