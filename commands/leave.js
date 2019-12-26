const Discord = require('discord.js');

exports.run = (client, message, args) => {
  //ignore dm's
  if (message.channel.type === 'dm')
      return message.channel.send(`You need to be in a server to use this command.`);
      
  /*if([client.config.ownerID, client.config.adminID].some(a => message.author.id == a) || message.member.roles.some(r=>["DJ", "dj", "DeeJay", "deejay"].includes(r.name))){
    const queue = client.getQueue(message.guild.id);
    if(!queue || queue.length == 0)
      return message.channel.send(`Currently not playing anything!`);
  
    queue.splice(0, queue.length);
    if(client.musicSettings[message.guild.id])
      delete client.musicSettings[message.guild.id];
    message.channel.send(`Leaving the voice channel...`);
    client.player.leave(message.guild.id);
  } else if(!message.member.roles.some(r=>["DJ", "dj", "DeeJay", "deejay"].includes(r.name)))
  return message.react('🚫') && message.channel.send('You need the `DJ` role to do that!');*/
      
  const cmd = client.commands.get('stop');
  cmd.run(client, message, args);
}
