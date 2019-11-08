exports.run = (client, message, args) => {
  score = client.getScore.get(message.author.id, message.guild.id);
  return message.reply(`You currently have ${score.points} points and you are level ${score.level}!`);
}
