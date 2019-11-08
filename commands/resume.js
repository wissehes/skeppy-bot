exports.run = (client, message, args) => {
  var queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.channel.send(`No music is playing!`);
  if(!msg.member.voiceChannelID)
    return message.channel.send(`You're not in a voice channel!`);

  if(bot.player.get(message.guild.id) && msg.member.voiceChannelID !== bot.player.get(message.guild.id).channel)
    return message.channel.send(`You're not in the playing voice channel!`);
      
  if(!client.player.get(message.guild.id).paused)
    return message.channel.send(`The player is already playing!`);
  client.player.get(message.guild.id).pause(false);
  message.channel.send(`:arrow_forward: Resumed the player.`);
}