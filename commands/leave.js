const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.channel.send(`Currently not playing anything!`);

  queue.splice(0, queue.length);
  message.channel.send(`Leaving the voice channel...`);
  client.player.leave(message.guild.id);
}