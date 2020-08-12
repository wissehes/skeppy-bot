const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (args[0]) {
        const user = message.mentions.users.first()
        if (user) {
            return sendAvatar(user, message);
        }
        if (!user) {
            return message.reply('Are you stupid? Just mention someone, smh');
        }
    }
    sendAvatar(message.author, message)

    function sendAvatar(userMention, message) {
        if (!userMention || !message)
            return;
        var embed = new Discord.MessageEmbed()
            .setTitle(`${userMention.tag}'s avatar`)
            .setImage(userMention.avatarURL())
        message.channel.send(embed)
        return;
    }
}
exports.info = {
    name: `avatar`,
    aliases: [],
    description: `Shows you your avatar or someone elses avatar!`,
    usage: `avatar [mention]`,
    category: `Misc`
}