const { RichEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    const DB = client.snipes
    if(client.snipes.has(message.guild.id, message.channel.id)){
        const DBResult = client.snipes.get(message.guild.id, message.channel.id)
        const author = client.users.get(DBResult.author)
        const embed = new RichEmbed()
            .setAuthor(author.tag, author.avatarURL)
            .setDescription(`Deleted message for ${message.channel}\n\n${DBResult.content}`)
            .setTimestamp(DBResult.created)
        message.channel.send(embed)
    }
}