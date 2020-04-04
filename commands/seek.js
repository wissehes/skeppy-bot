exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);

    var queue = client.getQueue(message.guild.id);
    if (!queue || queue.length == 0)
        return message.channel.send(`No music is playing!`);

    if (!message.member.voice.channel.id)
        return message.channel.send(`You're not in a voice channel!`);

    if (client.player.players.get(message.guild.id) && message.member.voice.channel.id !== client.player.players.get(message.guild.id).channel)
        return message.channel.send(`You're not in the playing voice channel!`);

    if (!queue[0].info.isSeekable)
        return message.channel.send(`This song is not seekable!`)
    var pos = args[0] * 1000
    if (!pos || pos.length < 1)
        return message.channel.send(`You must define a position in seconds`)

    message.channel.send(`Position set to ${pos / 1000} seconds`)
    client.player.players.get(message.guild.id).seek(pos)
}
exports.info = {
    name: `seek`,
    aliases: [],
    description: `Seek on song playing right now`,
    usage: `seek <seconds>`,
    category: `Music`,
    lock: true
}