const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const commandsDB = client.commandsInfo
  const categories = commandsDB.get('categories')
  if(!args[0]){
    const embed = new Discord.RichEmbed()
    .setTitle(`Skeppy Bot Help`)
    .setAuthor("Support Server", client.user.avatarURL, "https://discord.gg/dTJBDRU")
    .setColor("BLUE")
    .setThumbnail(client.user.avatarURL)
    .setFooter(`Made by ${client.users.get(client.config.ownerID).username}#${client.users.get(client.config.ownerID).discriminator}`)
    for(let i = 0; i < categories.length; i++){
      const data = commandsDB.get(`CAT_${categories[i].toLowerCase()}`)
      var commands = [];
      for(const e in data){
        const ee = data[e]
        commands.push(ee.name)
      }
      embed.addField(categories[i], '`'+commands.join("`, `")+'`')
    }
    message.channel.send(embed)
  } else if(args[0]){
    const arg = args[0].toLowerCase();
    var commandData = commandsDB.get(`commands`, arg)
    if(!commandData){
      return message.channel.send(`❌ | Thats not a valid command!`)
    }
    const commandName = commandData.name
    const embed = new Discord.RichEmbed()
    .setTitle(`\`${commandName}\` command`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(commandData.description)
    if(commandData.aliases[0]) embed.addField(`Aliases`, commandData.aliases.join(", "))
    embed.addField(`Usage`, commandData.usage)
    embed.addField(`Category`, commandData.category)

    message.channel.send(embed)
  }
}
exports.info = {
  name: `help`,
  aliases: [],
  description: `Shows help about a command!`,
  usage: `help [command]`,
  category: `Help`
}