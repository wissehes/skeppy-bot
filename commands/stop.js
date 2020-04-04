const Discord = require('discord.js');

exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);

    if (!message.member.voice.channel.id)
        return message.channel.send(`You're not in a voice channel!`);
    if (client.player.players.get(message.guild.id) && message.member.voice.channel.id !== client.player.players.get(message.guild.id).channel)
        return message.channel.send(`You're not in the playing voice channel!`);
    var queue = client.getQueue(message.guild.id);
    if (!queue || queue.length == 0)
        return message.channel.send(`No music is playing!`);

    queue.splice(0, queue.length);
    if (client.musicSettings[message.guild.id])
        delete client.musicSettings[message.guild.id];
    if (client.execQueue.checkSize)
        clearInterval(client.execQueue.checkSize)
    message.channel.send(`Stopped playing and cleared queue!`);
    client.player.leave(message.guild.id);
}
exports.info = {
    name: `stop`,
    aliases: ['sotp'],
    description: `Stop the player`,
    usage: `stop`,
    category: `Music`,
    lock: true
}