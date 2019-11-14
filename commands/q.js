exports.run = (client, message, args) => {

  const cmd = client.commands.get('queue');
  cmd.run(client, message, args);
}
