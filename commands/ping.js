exports.run = (client, message, args) => {
    message.channel.send("Ping?").then(m =>{
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    })
}
exports.info = {
  name: `ping`,
  aliases: [],
  description: `Shows the ping of the bot`,
  usage: `ping`,
  category: `Misc`
}