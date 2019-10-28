const Discord = require('discord.js');

exports.run = (client, message, args) => {
  var queue = client.getQueue(message.guild.id);
	if(!queue || queue.length == 0)
		return message.channel.send(`No music is playing!`);
	let howMany = 1;
	if(args[0])
		howMany = Math.min(parseInt(args[0]), queue.length);

	queue.splice(0, howMany - 1);
	message.channel.send(`Skipped ${howMany} songs.`);
	client.player.get(message.guild.id).stop();
}
