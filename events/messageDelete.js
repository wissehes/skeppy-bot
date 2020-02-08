module.exports = (client, message) => {
    const dbMessage = {
        content: message.content,
        author: message.author.id,
        created: message.createdAt
    }
    console.log(dbMessage)
    client.snipes.set(message.guild.id, dbMessage, message.channel.id)
}