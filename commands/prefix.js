const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    const getPrefixEmbed = async () => {
        const settings = await client.getGuild(message.guild)
        const embed = new RichEmbed()
        .setAuthor(`Prefix for ${message.guild.name}`, message.guild.iconURL)
        .setColor("BLUE")
        .setDescription(`My prefix in this guild is now : \`${settings.prefix}\``)

        return embed
    }
    if(!args[0]) {
        const embed = new RichEmbed()
        .setAuthor(`Prefix for ${message.guild.name}`, message.guild.iconURL)
        .setColor("BLUE")
        .setDescription(`My prefix in this guild is: \`${message.settings.prefix}\`\nSet a prefix with \`${message.settings.prefix}prefix set\``)

        message.channel.send(embed)
    }
    if(args[0] === "set"){
        if(args[1]){
            args.shift()
            const newPrefix = args.join(" ")
            await client.updateGuild(message.guild, { prefix: newPrefix })
            message.channel.send(await getPrefixEmbed())
        }
    }
}

exports.info = {
    name: `prefix`,
    aliases: [],
    description: `Set a custom prefix`,
    usage: `prefix [prefix]`,
    category: `Settings`,
    permissions: ["MANAGE_MESSAGES"]
}