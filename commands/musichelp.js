const Discord = require('discord.js');

exports.run = (client, message, args) => {
  message.channel.send(new Discord.RichEmbed()
    .setColor("RED")
    .setTitle(`Music help for ${client.user.tag}`)
    .addField(`${client.config.prefix}play`, 'Adds/Plays music in your voice channel!')
    .addField(`${client.config.prefix}leave`, 'Leave the voice channel.')
    .addField(`${client.config.prefix}np`, 'Check out what\'s currently playing!')
    .addField(`${client.config.prefix}queue`, 'Check out the queue!')
    .addField(`${client.config.prefix}pause`, 'Pauses the player.')
    .addField(`${client.config.prefix}resume`, 'Resumes the player.')
    .addField(`${client.config.prefix}skip`, 'Skip songs in the queue!')
    .addField(`${client.config.prefix}volume`, 'Set the current player volume!')
    .setThumbnail(client.user.avatarURL)
  );
}