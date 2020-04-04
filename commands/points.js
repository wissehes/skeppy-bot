exports.run = (client, message, args) => {
    if (args[0] && message.member.hasPermission('MANAGE_MESSAGES') && !message.mentions.users.first()) {
        switch (args[0]) {
            case 'on':
            case 'enable':
                client.updateGuild(message.guild, { levels: true })
                message.channel.send(`Levels are now turned **on** in ${message.guild.name}`)
                break;
            case 'on':
            case 'disable':
                client.updateGuild(message.guild, { levels: false })
                message.channel.send(`Levels are now turned **off** in ${message.guild.name}`)
        }
        return;
    }
    if (!message.settings.levels) {
        return message.channel.send(`❌ | Levels are not enabled in this server!`);
    }
    if (message.mentions.users.first()) {
        score = client.getScore.get(message.mentions.users.first().id, message.guild.id);
        if (!score) {
            return message.reply(`This user has no points!`)
        }
        return message.channel.send(`${message.mentions.users.first().username} currently has ${score.points} points and is level ${score.level}!`);
    }
    score = client.getScore.get(message.author.id, message.guild.id);
    return message.reply(`You currently have ${score.points} points and you are level ${score.level}!`);
}
exports.info = {
    name: `points`,
    aliases: [`level`, `levels`],
    description: `Shows your current level!`,
    usage: `level`,
    category: `Levels`
}