exports.run = (client, message, args) => {

    const cmd = client.commands.get('points');
    cmd.run(client, message, args);
}
