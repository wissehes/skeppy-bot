module.exports = (client, message) => {
    if(message.content.length < 1){
        return;
    }
    
    const dbMessage = {
        content: message.content,
        author: message.author.id,
        created: message.createdAt
    }
    console.log(dbMessage)
    client.snipes.set(message.guild.id, dbMessage, message.channel.id)
}