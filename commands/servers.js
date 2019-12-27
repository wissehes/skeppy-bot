exports.run = (client, message, args) => {
message.channel.send(`I'm in ${client.guilds.size} servers with ${client.users.size} members and ${client.channels.size} channels.`)
}
exports.info = {
    name: `servers`,
    aliases: [`guilds`],
    description: `Shows how many servers I'm in`,
    usage: `servers *or* guilds`,
    category: `Misc`
}