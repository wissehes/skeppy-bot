exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);
    
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
  
    if(!message.member.voiceChannelID)
        return message.channel.send(`You're not in a voice channel!`);

    if(client.player.get(message.guild.id) && message.member.voiceChannelID !== client.player.get(message.guild.id).channel)
        return message.channel.send(`You're not in the playing voice channel!`);

    if(!args[0]){
        return message.channel.send(`❌ | You need to supply the position of the song in the queue!`);
    } if(!args[0]){
        return message.channel.send(`❌ | You need to supply the new position of the song in the queue!`);
    }

    if(isNaN(args[0]) || isNaN(args[1])){
        return message.channel.send(`❌ | That's not a number!`);
    }
    var pos1 = parseInt(args[0])
    var pos2 = parseInt(args[1])
    if (pos1 < 1 || pos2 < 1){
        return message.channel.send(`❌ | The position can't be smaller than 1!`);
    }
    if(!queue[pos1]){
        return message.channel.send(`❌ | Position ${pos1} doesn't exist!`);
    } if(!queue[pos2]){
        return message.channel.send(`❌ | Position ${pos2} doesn't exist!`);
    }
    try {
        queue.move(pos1, pos2)
        message.channel.send(`✅ | \`${queue[pos1].info.title}\` successfully moved from position ${pos1} to ${pos2}`)
    } catch (e) {
        message.channel.send(`⚠️ | An error occurred while moving \`${queue[pos1].info.title}\` from position ${pos1} to ${pos2}`)
    }

}
exports.info = {
    name: `move`,
    aliases: ['m'],
    description: `Move an item in the queue`,
    usage: `move <item in queue> <new position>`,
    category: `Music`
}