exports.run = (client, message, args) => {
  //ignore dm's
  if (message.channel.type === 'dm')
      return message.channel.send(`You need to be in a server to use this command.`);
  const cmd = client.commands.get('queue');
  cmd.run(client, message, args);
}
