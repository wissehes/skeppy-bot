const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const categories = []
    client.commands.forEach((command) => {
        if (command.info) {
            if (!categories.find(c => c.category == command.info.category)) {
                categories.push({
                    category: command.info.category,
                    commands: [
                        command.info
                    ]
                })
            } else {
                categories.find(c => c.category == command.info.category).commands.push(command.info)
            }
        }
    })

    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Skeppy Bot Help`)
            .setAuthor("Support Server", client.user.avatarURL, "https://discord.gg/dTJBDRU")
            .setColor("BLUE")
            .setThumbnail(client.user.avatarURL)
            .setFooter(`Made by ${client.users.resolve(client.config.ownerID).username}#${client.users.resolve(client.config.ownerID).discriminator}`)
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i]
            const commandNames = category.commands.map(co => `\`${co.name}\``)
            embed.addField(category.category, commandNames.join(", "))
        }
        message.channel.send(embed)
    } else if (args[0]) {
        const arg = args[0].toLowerCase();
        const commands = client.commands.filter(c => c.info)
        const command = commands.find(c => c.info.name.toLowerCase() == arg)
        if (!command) {
            return message.channel.send(`❌ | Command not found!`)
        }
        const commandData = command.info
        const commandName = commandData.name
        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${commandName}\` command`)
            .setThumbnail(client.user.avatarURL)
            .setDescription(commandData.description)
            .setColor("RANDOM")
        if (commandData.aliases[0]) embed.addField(`Aliases`, commandData.aliases.join(", "))
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