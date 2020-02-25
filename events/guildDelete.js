const Discord = require('discord.js')
module.exports = (client, guild) => {
  // This event triggers when the bot joins a guild.
  console.log(`Removed from: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members!`);
  client.user.setActivity(`for "skeppy help" in ${client.guilds.size} servers | skeppybot.xyz`, {type: "WATCHING"});
  const embed = new Discord.RichEmbed()
  .setTitle(`😕 I was removed from a new server!`)
  .setColor('RED')
  .setDescription(`I was removed from ${guild.name}`)
  //.addField(`Owner`, guild.owner.user.tag)
  .addField(`Guild ID`, guild.id)
  //.addField(`User count`, guild.memberCount)
  if(guild.iconURL) embed.setThumbnail(guild.iconURL);
  client.channels.get(client.config.NewServerChannel).send(embed)
  try {
    client.deleteGuild(guild)
  } catch(e){}
}