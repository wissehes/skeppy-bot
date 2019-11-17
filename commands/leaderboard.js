exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
    return message.channel.send(`You need to be in a server to use this command.`);
    
  const Discord = require("discord.js");
  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./scores.sqlite');
  const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0x00AE86);

  for(const data of top10) {
    embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
  }
  return message.channel.send({embed});

}
