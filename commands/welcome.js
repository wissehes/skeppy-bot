const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.reply("You don't have permission to use this command, you need `MANAGE_CHANNELS`!s");
    }

    const getStatusEmbed = async () => {
        const settings = await client.getGuild(message.guild)
        let channel = client.channels.resolve(settings.welcomeChannel)
        if (!channel) {
            channel = client.channels.cache.find(channel => channel.name === settings.welcomeChannel)
            if (channel) {
                channel = `**Not Found**`
            } else {
                channel = channel.name
            }
        }
        const embed = new MessageEmbed()
            .setTitle(`Welcome settings for ${message.guild.name}`)
            .setColor("BLUE")
            .setDescription(`
**Status**: ${settings.welcome ? `on` : `off`}
**Channel**: ${channel}
**Message**: ${settings.welcomeMessage}                     
`)
            .addField(`Setting a channel`, `\`${settings.prefix}welcome channel <channel>\``)
            .addField(`Setting a message`, `\`${settings.prefix}welcome message\``)
            .addField(`Enabling/disabling welcome messages`, `\`${settings.prefix}welcome enable/disable\``)
        return embed
    }

    const filter = response => {
        return message.author.id === response.author.id
    };

    switch (args[0]) {
        case 'on':
        case 'enable':
            await client.updateGuild(message.guild, { welcome: true })
            message.channel.send(await getStatusEmbed())
            break;
        case 'off':
        case 'disable':
            await client.updateGuild(message.guild, { welcome: false })
            message.channel.send(await getStatusEmbed())
            break;
        case 'message':
            message.channel.send(`Type your welcome message in chat now. Remember, you can put \`{{user}}\` to mention someone, \`{{usertag}}\` for something like \`Member#0001\`, or \`{{username}}\` for something like \`UserName\``)
                .then((msg) => {
                    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(async collected => {
                            await client.updateGuild(message.guild, { welcomeMessage: collected.first().content })
                            const embed = await getStatusEmbed()
                            message.channel.send(embed)
                        })
                })
            break;
        case 'channel':
            if (args[1]) {
                if (!message.mentions.channels.first()) {
                    return message.reply("Please mention a channel!")
                } else {
                    await client.updateGuild(message.guild, { welcomeChannel: message.mentions.channels.first().id })
                    const embed = await getStatusEmbed()
                    message.channel.send(embed)
                }
            } else {
                message.channel.send(`Mention the channel you want to set as welcome channel!`)
                    .then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                            .then(async collected => {
                                if (!collected.first().mentions.channels.first()) {
                                    const foundChannel = client.channels.find(ch => ch.name === collected.first().content)
                                    if (!foundChannel) {
                                        message.reply(`I couldn't find that channel!`)
                                    } else {
                                        await client.updateGuild(message.guild, { welcomeChannel: foundChannel.id })
                                        const embed = await getStatusEmbed()
                                        message.channel.send(embed)
                                    }
                                } else {
                                    await client.updateGuild(message.guild, { welcomeChannel: collected.first().mentions.channels.first().id })
                                    const embed = await getStatusEmbed()
                                    message.channel.send(embed)
                                }
                            })
                    })
            }
            break;
        case "":
        default:
            const embed = await getStatusEmbed()
            message.channel.send(embed)
            break;
    }
}

exports.info = {
    name: `welcome`,
    aliases: ['welcomer'],
    description: `Set the welcoming settings!`,
    usage: `welcome`,
    category: `Settings`,
    permissions: ["MANAGE_CHANNELS"]
}