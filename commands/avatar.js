const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(args[0]){
        const user = message.mentions.users.first()
        if(user){
            return sendAvatar(user, message);
        }
        if (!user) {
			return message.reply('Are you stupid? Just mention someone, smh');
		}
    }
    sendAvatar(message.author, message)
    function sendAvatar(userMention, message){
        if (!userMention || !message) 
            return;
        var embed = new Discord.RichEmbed()
            .setTitle(`${userMention.tag}'s avatar`)
            .setImage(userMention.avatarURL)
        message.channel.send(embed)
        return;
    }
}