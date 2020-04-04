const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Here are some links`)
        .setDescription(`
[Invite](https://discordapp.com/oauth2/authorize?client_id=579327336395309062&scope=bot&permissions=2084044031)
[Vote](https://top.gg/bot/579327336395309062)
[Website](https://skeppybot.xyz/)
    `)
    message.channel.send(embed)
}
exports.info = {
    name: `invite`,
    aliases: [],
    description: `Shows links to invite the Skeppy Bot!`,
    usage: `invite`,
    category: `Misc`
}