exports.run = async (client, message, args) => {
  //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);

    if(!client.player.get(message.guild.id))
        return message.channel.send(`Currently not playing anything!`);
    
    if(!message.member.voiceChannelID)
        return message.channel.send(`You're not in a voice channel!`);

	if(client.player.get(message.guild.id) && message.member.voiceChannelID !== client.player.get(message.guild.id).channel)
		return message.channel.send(`You're not in the playing voice channel!`);

    if(client.musicSettings[message.guild.id]){
        if(client.musicSettings[message.guild.id].lock){
            if(client.musicSettings[message.guild.id].lockid !== message.author.id){
                return message.channel.send(`🔐| Music commands are locked by ${client.users.get(client.musicSettings[message.guild.id].lockid).username}`);
            }
        }
    }

    if(!client.musicSettings[message.guild.id] || Object.keys(client.musicSettings[message.guild.id]).length == 0)
        client.musicSettings[message.guild.id] = {loop:0, shuffle:false, lock: false, lockid: 0};

    var ms = client.musicSettings[message.guild.id];

    if(!args[0]) {
        if(ms.loop == 0) {
            message.channel.send(`Arguments not found. Looping one song only :repeat_one:\n\n**Note**: \`0/off\` is to turn off loop, \`1/one\` is to loop one song, \`2/multi/all\` is to loop the whole queue.`);
            ms.loop = 1;
        } else {
            message.channel.send(`Arguments not found. Loop disabled.\n\n**Note**: \`0/off\` is to turn off loop, \`1/one\` is to loop one song, \`2/multi/all\` is to loop the whole queue.`);
            ms.loop = 0;
        }
    } else {
        var ar = args[0].toLowerCase();
        if(ar == '0' || ar == 'off') {
            ms.loop = 0;
            message.channel.send(`Loop disabled.`);
        } else if(ar == '1' || ar == 'one') {
            ms.loop = 1;
            message.channel.send(`Loop set to one song. :repeat_one:`);
        } else if(ar == '2' || ar == 'multi' || ar == 'all') {
            ms.loop = 2;
            message.channel.send(`Loop set to multiple songs. :repeat:`);
        } else {
            message.channel.send(`Invalid loop type. \n\`0/off\` is to turn off loop, \`1/one\` is to loop one song, \`2/multi/all\` is to loop the whole queue.`);
        }
    }
}