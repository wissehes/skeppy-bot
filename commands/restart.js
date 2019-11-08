exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.ownerID)
        return message.reply('no');
    message.channel.send(`Restarting...`)
    setTimeout(process.exit,500);
    message.channel.send(`Restarted!`)
}