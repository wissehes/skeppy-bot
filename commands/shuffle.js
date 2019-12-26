exports.run = async (client, message, args) => {
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

    if(!client.musicSettings[message.guild.id])
        client.musicSettings[message.guild.id] = {loop:0, shuffle:false, lock: false, lockid: 0};

    var ms = client.musicSettings[message.guild.id];

    if(!ms.shuffle) {
        ms.shuffle = true;
        message.channel.send(`Shuffle turned on.`);
    } else {
        ms.shuffle = false;
        message.channel.send(`Shuffle turned off.`);
    }
}