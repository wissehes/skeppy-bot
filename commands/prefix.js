const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {
    const getPrefixEmbed = async() => {
        const settings = await client.getGuild(message.guild)
        const embed = new MessageEmbed()
            .setAuthor(`Prefix for ${message.guild.name}`, message.guild.iconURL)
            .setColor("BLUE")
            .setDescription(`My prefix in this guild is now : \`${settings.prefix}\`\n\nYou can see my prefix anytime by mentioning me.`)

        return embed
    }
    if (!args[0]) {
        const embed = new MessageEmbed()
            .setAuthor(`Prefix for ${message.guild.name}`, message.guild.iconURL)
            .setColor("BLUE")
            .setDescription(`My prefix in this guild is: \`${message.settings.prefix}\`\nSet a prefix with \`${message.settings.prefix}prefix <new prefix>\``)

        message.channel.send(embed)
    }
    if (args[0]) {
        if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id !== client.config.ownerID) {
            return;
        }
        const newPrefix = args.join(" ")
        await client.updateGuild(message.guild, { prefix: newPrefix })
        message.channel.send(await getPrefixEmbed())
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