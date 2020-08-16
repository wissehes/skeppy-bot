exports.run = async (client, message, args) => {
    message.channel.send(`You can vote at: https://top.gg/bot/579327336395309062/vote`)
}
exports.info = {
    name: `vote`,
    aliases: ['v'],
    description: `Vote for the Skeppy bot!`,
    usage: `vote`,
    category: `Misc`,
}