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

    if (client.player.players.get(message.guild.id).paused)
        return message.channel.send(`The player is already paused!`);
    client.player.players.get(message.guild.id).pause(true);
    message.channel.send(`:pause_button: Paused the player.`);
}
exports.info = {
    name: `pause`,
    aliases: [],
    description: `Pause the player!`,
    usage: `pause`,
    category: `Music`,
    lock: true
}