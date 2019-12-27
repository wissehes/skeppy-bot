exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.ownerID)
        return message.reply('no');
    message.channel.send(`Restarting...`)
    setTimeout(process.exit,500);
    message.channel.send(`Restarted!`)
}
exports.info = {
    name: `restart`,
    aliases: [],
    description: `Restart the bot!`,
    usage: `restart`,
    category: `Owner Only`
}