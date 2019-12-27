exports.run = (client, message, args) => {
  //ignore dm's
  if (message.channel.type === 'dm')
    return message.channel.send(`You need to be in a server to use this command.`);
  if(!client.npSettings.get(message.guild.id, "levels")){
    return message.channel.send(`❌ | Levels are not enabled in this server!`);
  }
  score = client.getScore.get(message.author.id, message.guild.id);
  return message.reply(`You currently have ${score.points} points and you are level ${score.level}!`);
}
exports.info = {
  name: `points`,
  aliases: [`level`, `levels`],
  description: `Shows your current level!`,
  usage: `level`,
  category: `Levels`
}