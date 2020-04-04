exports.run = async(client, message, args) => {
    if (args[0] == `status`) {
        var settings = client.musicSettings[message.guild.id];
        if (!settings) {
            var queue = client.getQueue(message.guild.id);
            if (!queue || queue.length == 0) {
                message.channel.send(`🔇 | Nothing is currently playing!`)
            } else if (queue) {
                message.channel.send(`🔓 | Lock is currently disabled!`)
            }
            return;
        }
        if (settings.lock == true) {
            message.channel.send(`🔒 | Lock is currently enabled!`)
        } else if (settings.lock == false) {
            message.channel.send(`🔓 | Lock is currently disabled!`)
        }
    }

    if (!message.member.voice.channel.id)
        return message.channel.send(`You're not in a voice channel!`);

    if (client.player.players.get(message.guild.id) && message.member.voice.channel.id !== client.player.players.get(message.guild.id).channel)
        return message.channel.send(`You're not in the playing voice channel!`);
    var queue = client.getQueue(message.guild.id);
    if (!queue || queue.length == 0)
        return message.channel.send(`No music is playing!`);

    if (!client.musicSettings[message.guild.id] || Object.keys(client.musicSettings[message.guild.id]).length == 0)
        client.musicSettings[message.guild.id] = { loop: 0, shuffle: false, lock: false, lockid: 0 };
    var settings = client.musicSettings[message.guild.id];
    if (!args[0]) {
        if (settings.lock == true) {
            if (settings.lockid == message.author.id) {
                settings.lock = false
                settings.lockid = 0
                message.channel.send(`✅ | Lock disabled! 🔓`)
            } else {
                message.channel.send(`❌ | You didn't start this session!`)
            }
            return;
        }
        if (queue.startedBy == message.author.id) {
            settings.lock = true
            settings.lockid = message.author.id
            message.channel.send(`✅ | Lock enabled! 🔒`)
        } else {
            message.channel.send(`❌ | You didn't start this session!`)
        }
    } else if (args[0] == `disable` || args[0] == `off`) {
        if (settings.lock) {
            if (settings.lockid == message.author.id) {
                settings.lock = false
                settings.lockid = 0
                message.channel.send(`✅ | Lock disabled! 🔓`)
            } else {
                message.channel.send(`❌ | You didn't start this session!`)
            }
        } else {
            message.channel.send(`❌ | Lock isn't enabled! You can enable it with \`${message.settings.prefix}lock\``)
        }
    } else if (args[0] == `enable` || args[0] == `on`) {
        if (queue.startedBy == message.author.id) {
            settings.lock = true
            settings.lockid = message.author.id
            message.channel.send(`✅ | Lock enabled! 🔒`)
        } else {
            message.channel.send(`❌ | You didn't start this session!`)
        }
    }
}
exports.info = {
    name: `lock`,
    aliases: [],
    description: `Lock music commands to yourself!`,
    usage: `lock [on/off]`,
    category: `Music`
}