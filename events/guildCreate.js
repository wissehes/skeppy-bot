const Discord = require('discord.js')
module.exports = (client, guild) => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`for "${client.config.prefix[0]}help" in ${client.guilds.size} servers | skeppybot.xyz`, {type: "WATCHING"});
  const embed = new Discord.RichEmbed()
  .setTitle(`🎉 I was added to a new server!`)
  .setColor('GREEN')
  .setDescription(`I was added to ${guild.name}`)
  //.addField(`Owner`, guild.owner.user.tag)
  .addField(`Guild ID`, guild.id)
  .addField(`User count`, guild.memberCount)
  if(guild.iconURL) embed.setThumbnail(guild.iconURL);
  client.channels.get(client.config.NewServerChannel).send(embed)
}
