exports.run = (client, message, args) => {
  let guilds;
  if(message.author.id !== client.config.ownerID) return;
  //var guildList = client.guilds.array().join(", ");
  message.channel.send(`i'm in ${client.guilds.size} servers: `)
  client.guilds.array().forEach(sendIt)
  function sendIt(item, index){
    guilds += item + ', ' + item.memberCount + ' members. (id: ' + item.id + ')' + '\n'
  }
  const guildList = guilds.replace('undefined', '');
  message.channel.send(guildList)
}
