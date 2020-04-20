const Discord = require('discord.js');

exports.run = (client, message, args) => {
        //ignore dm's
        if (message.channel.type === 'dm')
            return message.channel.send(`You need to be in a server to use this command.`);

        var queue = client.getQueue(message.guild.id);
        if (!queue || queue.length == 0)
            return message.channel.send(`No music is playing!`);

        var q = queue;
        //var requestedBy = client.users.resolve(queue[0].requestedBy).username
        //var list = queue.map((a, i) => `**${i + 1}**. ${a.info.author ? `[**${a.info.title}**](${a.info.uri}) by **${a.info.author}**` : `Unknown`} (${client.getYTLength(a.info.length)})`);
        //var list = queue.map((a, i) => `**${i + 1}**. ${a.info.author ? `[**${a.info.title}**](${a.info.uri})` : `Unknown`} added by **${client.users.resolve(a.requestedBy).username}** (${client.getYTLength(a.info.length)})`);
        var list = queue.map((a, i) => {
                    if (i == 0) return;
                    return `**${i}**. ${a.info.author ? `[**${a.info.title}**](${a.info.uri})` : `Unknown`} added by **${client.users.resolve(a.requestedBy).username}** (${client.getYTLength(a.info.length)})`
  });

  var playingMore;
  if(list.length > 11){
    list.splice(11, list.length);
    var moreSongs = q.length - 11
    playingMore = `+ ${moreSongs} more ${moresongs = 1 ? `song` : `songs`}`
  }

  var e = queue[0]
  var nowPlaying = `${e.info.author ? `[**${e.info.title}**](${e.info.uri})` : `Unknown`} added by **${client.users.resolve(e.requestedBy).username}** (${client.getYTLength(e.info.length)})`
  var embed = new Discord.MessageEmbed();
  embed.setColor('0357ff').setTitle(`Queue for **${message.guild.name}**`);
  let loopV = `off`
  let shuffleV = `off`
  embed.setDescription(`Now Playing:\n${nowPlaying}${q.length > 1 ? `\n\nPlaying next:${list.join('\n')}\n${playingMore ? playingMore : ''}` : ``}`);
  if(client.musicSettings[message.guild.id]){
    if(client.musicSettings[message.guild.id].loop == 1)
      loopV = `single song`
    if(client.musicSettings[message.guild.id].loop == 2)
      loopV = `whole queue`
    if(client.musicSettings[message.guild.id].shuffle)
      shuffleV = `on`
  }

    //embed.addField('Current Settings', `**Loop**: ${client.musicSettings[message.guild.id].loop}\n**Shuffle**: ${client.musicSettings[message.guild.id].shuffle}\n **Now playing messages**: ${npMsgs}`);
  //else
    //embed.addField('Current Settings', `**Loop**: 0\n**Shuffle**: false\n **Song updates**: ${npMsgs}`);
      embed.addField('Current Settings', `**Loop**: ${loopV}\n**Shuffle**: ${shuffleV}\n**Song updates**: ${message.settings.np ? 'on' : 'off'}`)
    message.channel.send(embed);
}
exports.info = {
  name: `queue`,
  aliases: [`q`],
  description: `Shows the queue of songs`,
  usage: `queue`,
  category: `Music`
}