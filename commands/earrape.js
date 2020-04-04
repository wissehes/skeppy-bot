exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);

    var queue = client.getQueue(message.guild.id);
    //if(![client.config.ownerID, client.config.adminID].some(a => message.author.id == a)) return;
    if ([client.config.ownerID, client.config.adminID].some(a => message.author.id == a) || message.member.roles.some(r => ["DJ", "dj", "DeeJay", "deejay"].includes(r.name))) {
        if (!message.member.voice.channel.id)
            return message.channel.send(`You're not in a voice channel!`);

        if (!queue || queue.length == 0)
            return message.channel.send(`No music is playing!`);

        if (!args[0]) {
            var volume = client.player.players.get(message.guild.id).state.volume;
            if (volume > 100) {
                client.player.players.get(message.guild.id).volume(100);
                message.react('✅')
                message.channel.send(`Earrape mode turned **off**`)
            } else if (volume < 100 || volume == 100) {
                try {
                    client.player.players.get(message.guild.id).volume(Number.MAX_VALUE);
                    message.channel.send(`Earrape mode turned **on**. Volume: ${client.player.players.get(message.guild.id).state.volume}%.`);
                    message.react('✅')
                } catch (error) {
                    message.reply('An error occurred! ' + error)
                }
            }
            return;
        }
        if (args[0]) {
            var num = args[0]
            try {
                client.player.players.get(message.guild.id).volume(num * 100);
                message.channel.send(`Volume set to ${client.player.players.get(message.guild.id).state.volume}%.`);
                message.channel.send(`Earrape mode turned **on**. Volume: ${client.player.players.get(message.guild.id).state.volume}%.`);
                message.react('✅')
            } catch (error) {
                message.reply('An error occurred! ' + error)
            }
        }
    } else if (!message.member.roles.some(r => ["DJ", "dj", "DeeJay", "deejay"].includes(r.name)))
        return message.react('🚫') && message.channel.send('You need the `DJ` role to do that!');
}

exports.info = {
    name: `earrape`,
    aliases: [],
    description: `Turn earrape on/off!`,
    usage: `earrape [level]`,
    category: `Music`,
    lock: true
}