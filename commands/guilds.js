exports.run = (client, message, args) => {
  if(message.author.id !== client.config.ownerID) return;
  var guildList = client.guilds.array().join(", ");
  message.channel.send(`i'm in ${client.guilds.size} servers: ` +guildList)
}
