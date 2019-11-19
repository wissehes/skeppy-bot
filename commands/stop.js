const Discord = require('discord.js');

exports.run = (client, message, args) => {
  //ignore dm's
  if (message.channel.type === 'dm')
      return message.channel.send(`You need to be in a server to use this command.`);
      
	if(!message.member.voiceChannelID)
    	return message.channel.send(`You're not in a voice channel!`);
	if(client.player.get(message.guild.id) && message.member.voiceChannelID !== client.player.get(message.guild.id).channel)
		return message.channel.send(`You're not in the playing voice channel!`);
  	var queue = client.getQueue(message.guild.id);
	if(!queue || queue.length == 0)
		return message.channel.send(`No music is playing!`);
  
    queue.splice(0, queue.length);
    if(client.musicSettings[message.guild.id])
      delete client.musicSettings[message.guild.id];
      
    client.player.get(message.guild.id).pause(true);
    message.channel.send(`Stopped playing`);
    //client.player.get(message.guild.id).stop();
    //client.player.leave(message.guild.id);
}
