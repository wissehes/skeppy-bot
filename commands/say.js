exports.run = (client, message, args) => {
  var memberTag = message.author.username
  if(args.includes(`@everyone`, `@here`) || message.mentions.users.first()){
    return message.reply(`You can't mention anyone!`)
  }
  // makes the bot say something and delete the message. As an example, it's open to anyone to use.
  // To get the "message" itself we join the `args` back into a string with spaces:
  const sayMessage = args.join(" ");
  // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
  message.delete();
  // And we get the bot to say the thing:
  message.channel.send("**" + memberTag + ": **" + sayMessage);
}
