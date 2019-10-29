exports.run = (client, message, args) => {
  if(message.author.id !== client.config.ownerID) return;
      var guildList = client.guilds.array();
      const sayMessage = args.join(" ");
      try {
          guildList.forEach(guild => guild.systemChannel.send(sayMessage));
      } catch (err) {
          console.log("Could not send message to " + guildList.name);
      }
}
