exports.run = (client, message, args) => {
message.channel.send(`I'm in ${client.guilds.size} with ${client.guilds.size} members.`)
}