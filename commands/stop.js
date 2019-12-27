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

    if(client.musicSettings[message.guild.id]){
      if(client.musicSettings[message.guild.id].lock){
          if(client.musicSettings[message.guild.id].lockid !== message.author.id){
              return message.channel.send(`🔐| Music commands are locked by ${client.users.get(client.musicSettings[message.guild.id].lockid).username}`);
          }
      }
  }
  
    queue.splice(0, queue.length);
    if(client.musicSettings[message.guild.id])
      delete client.musicSettings[message.guild.id];
    if(client.execQueue.checkSize)
        clearInterval(client.execQueue.checkSize)
    if(client.execQueue.leaveTimeout)
        clearTimeout(client.execQueue.leaveTimeout)
    message.channel.send(`Stopped playing and cleared queue!`);
    client.player.leave(message.guild.id);
}
