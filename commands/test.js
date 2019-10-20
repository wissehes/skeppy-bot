exports.run = (client, message, args) => {
  message.channel.send("Hello").then((newMessage) => {newMessage.edit("Edited!");});
}
