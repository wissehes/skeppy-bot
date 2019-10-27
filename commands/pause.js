exports.run = (client, message, args) => {
  var queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.channel.send(`No music is playing!`);
    
  if(client.player.get(message.guild.id).paused)
    return message.channel.send(`The player is already paused!`);
  client.player.get(message.guild.id).pause(true);
  message.channel.send(`:pause_button: Paused the player.`);
}