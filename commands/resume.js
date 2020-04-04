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

    if (!client.player.players.get(message.guild.id).paused)
        return message.channel.send(`The player is already playing!`);
    client.player.players.get(message.guild.id).pause(false);
    message.channel.send(`:arrow_forward: Resumed the player.`);
}
exports.info = {
    name: `resume`,
    aliases: ['unpause'],
    description: `Resume the player if its paused`,
    usage: `resume`,
    category: `Music`,
    lock: true
}