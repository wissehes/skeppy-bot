var axios = require("axios")
const Discord = require('discord.js');
exports.run = (client, message, args) => {
if(!args[0]){
    var queue = client.getQueue(message.guild.id);
    if(!queue || queue.length == 0)
      return message.channel.send(`No music is playing!`);
    sendLyrics(queue[0].info.title)
    return;
}
if (args[0]){
    var q = args.join(' ')
    sendLyrics(q)
}
      function sendLyrics(q){
        axios.get('https://api.ksoft.si/lyrics/search?q='+q, {headers: {'Authorization': 'Bearer '+client.config.ksoftApi}})
        .then(res => {
            var lyrics = res.data.data[0].lyrics
            var song = res.data.data[0].artist + ' - ' + res.data.data[0].name
            var firstLyricPart = lyrics.substring(0, Math.min(lyrics.length, 0 + 1990));
            var lastArrayElement = lyrics.slice(firstLyricPart.length).trim() 
            var requestedBy = message.author.tag
            console.log(lastArrayElement)
            for(let i = 0; i < lyrics.length; i += 1990) {
              const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 1990));
              //sendIt(toSend);
                  if (toSend == firstLyricPart) {
                      sendIt(toSend, true)
                  } else if (toSend == lastArrayElement){
                      sendIt(toSend, false, true)
                  } else {
                      sendIt(toSend, false, false)
                  }
              }
            function sendIt(msg, first, last){
              if(first){
                  var embed = new Discord.RichEmbed()
                  .setAuthor(song)
                  .setColor('BLUE')
                  .setDescription(msg);
                  message.channel.send(embed) 
              } else if (last){
                  var embed = new Discord.RichEmbed()
                  .setDescription(msg)
                  .setColor('BLUE')
                  .setFooter(`Requested by ${requestedBy} | Lyrics provided by KSoft`, message.author.avatarURL);
                  message.channel.send(embed) 
                  return;
              } else if (!first && !last) {
                  var embed = new Discord.RichEmbed()
                  .setDescription(msg)
                  .setColor('BLUE');
                  message.channel.send(embed)
              }
            }
        })
      }
}