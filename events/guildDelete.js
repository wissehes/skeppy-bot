module.exports = (client, guild) => {

    // This event triggers when the bot joins a guild.
    console.log(`Removed from: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members!`);
    client.user.setActivity(`for "${client.config.prefix[0]}help" in ${client.guilds.size} servers | skeppybot.xyz`, {type: "WATCHING"});
    client.channels.get(client.config.NewServerChannel).send(`😕 I was removed from: ${guild.name} (id: ${guild.id}). With ${guild.memberCount} members`)
  }