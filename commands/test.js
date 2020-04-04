exports.run = (client, message, args) => {
    if (message.author.id !== client.config.ownerID) {
        return;
    }

    client.guilds.cache.forEach(e => {
        setTimeout(() => {
            const channel = e.channels.cache.find(ch => ch.name == "general")
            if (channel) {
                channel.send(args.join(" "))
            } else if (e.systemChannel) {
                e.systemChannel.send(args.join(" "))
            }
        }, 1000)
    })
}
exports.info = {
    name: `test`,
    aliases: [],
    description: `test`,
    usage: ``,
    category: `Misc`,
    lock: false
}