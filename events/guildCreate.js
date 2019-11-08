module.exports = (client, guild) => {

  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`for "${client.config.prefix}help" | Serving ${client.guilds.size} servers`, {type: "WATCHING"});
  client.channels.get(client.config.NewServerChannel).send(`🎉 I was added to a new server: ${guild.name} (id: ${guild.id}). With ${guild.memberCount} members!`)
}
