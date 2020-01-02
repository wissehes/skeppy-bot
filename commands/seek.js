exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);

    var queue = client.getQueue(message.guild.id);
    if (!queue || queue.length == 0)
        return message.channel.send(`No music is playing!`);

    if (client.musicSettings[message.guild.id]) {
        if (client.musicSettings[message.guild.id].lock) {
            if (client.musicSettings[message.guild.id].lockid !== message.author.id) {
                return message.channel.send(`🔐| Music commands are locked by ${client.users.get(client.musicSettings[message.guild.id].lockid).username}`);
            }
        }
    }

    if (!message.member.voiceChannelID)
        return message.channel.send(`You're not in a voice channel!`);

    if (client.player.get(message.guild.id) && message.member.voiceChannelID !== client.player.get(message.guild.id).channel)
        return message.channel.send(`You're not in the playing voice channel!`);

    if (!queue[0].info.isSeekable)
        return message.channel.send(`This song is not seekable!`)
    var pos = args[0] * 1000
    if (!pos || pos.length < 1)
        return message.channel.send(`You must define a position in seconds`)

    message.channel.send(`Position set to ${pos / 1000} seconds`)
    client.player.get(message.guild.id).seek(pos)
}
exports.info = {
    name: `seek`,
    aliases: [],
    description: `Seek on song playing right now`,
    usage: `seek <seconds>`,
    category: `Music`
}