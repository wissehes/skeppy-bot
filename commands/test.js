exports.run = (client, message, args) => {
  //message.channel.send("Hello").then((newMessage) => {newMessage.edit("Edited!");});
  message.guild.fetchMembers().then(fetchedGuild => {
    const totalOnline = message.guild.roles.get('265124127789023232').members.filter(member => member.presence.status === 'online');
    message.channel.send(`There are currently ${totalOnline.size} members online in this guild!`);
  });
}