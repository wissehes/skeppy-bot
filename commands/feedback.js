const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (client.cooldown.has(message.author.id))
        return;
    
    if(!args[0] || args[0].length < 1)
        return message.channel.send(`You need to give some feedback!`);
    //command cooldown uwu
    client.cooldown.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after 2.5 seconds
      client.cooldown.delete(message.author.id);
    }, 2500);

    var feedback = args.join(' ');
    var feedbackChannel = client.channels.get(client.config.feedbackChannel)
    var feedbackUser = message.author.toString()
    var ownerMention = client.users.get(client.config.ownerID).toString()
    var feedbackEmbed = new Discord.RichEmbed()
        .setTitle(`New suggestion`)
        .setColor(`GREEN`)
        .addField(`By`, feedbackUser)
        .addField(`Feedback message`, feedback)
        .setTimestamp()
    var responseEmbed = new Discord.RichEmbed()
        .setTitle(`Success!`)
        .setColor(`GREEN`)
        .setDescription(`Feedback send!`)
    try {
        feedbackChannel.send(ownerMention, feedbackEmbed)
        message.channel.send(responseEmbed)

    } catch(e) {
        message.channel.send(`an error ocurred o-o`)
    }

}