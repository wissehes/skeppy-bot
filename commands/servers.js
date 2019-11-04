exports.run = (client, message, args) => {
message.channel.send(`I'm in ${client.guilds.size} servers with ${client.users.size} members and ${client.channels.size} channels.`)
}