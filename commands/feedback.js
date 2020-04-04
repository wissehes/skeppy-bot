const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (!args[0] || args[0].length < 1)
        return message.channel.send(`You need to give some feedback!`);

    var feedback = args.join(' ');
    var feedbackChannel = client.channels.get(client.config.feedbackChannel)
    var feedbackUser = message.author.toString()
    var ownerMention = client.users.resolve(client.config.ownerID).toString()
    var feedbackEmbed = new Discord.MessageEmbed()
        .setTitle(`New suggestion`)
        .setColor(`GREEN`)
        .addField(`By`, `${feedbackUser} (${message.author.tag})`)
        .addField(`Feedback message`, feedback)
        .setTimestamp()
    var responseEmbed = new Discord.MessageEmbed()
        .setTitle(`Success!`)
        .setColor(`GREEN`)
        .setDescription(`Feedback send!`)
    try {
        feedbackChannel.send(ownerMention, feedbackEmbed)
        message.channel.send(responseEmbed)

    } catch (e) {
        message.channel.send(`an error ocurred o-o`)
    }
}
exports.info = {
    name: `feedback`,
    aliases: [],
    description: `Send feedback to the developers of this bot!`,
    usage: `feedback <message>`,
    category: `Misc`
}