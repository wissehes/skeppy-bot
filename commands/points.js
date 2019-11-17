exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
    return message.channel.send(`You need to be in a server to use this command.`);
    
  score = client.getScore.get(message.author.id, message.guild.id);
  return message.reply(`You currently have ${score.points} points and you are level ${score.level}!`);
}
