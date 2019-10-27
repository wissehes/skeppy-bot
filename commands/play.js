exports.run = (client, message, args) => {
  const searchstring = args.join(" ");
  if (searchstring.includes(".mp3") && message.member.voiceChannel){
      const connection = message.member.voiceChannel.join().then(connection => {
      const dispatcher = connection.playStream(searchstring);
      message.react("✅");
      });
    } else {
    client.music.bot.playFunction(message, searchstring);
  }
}
