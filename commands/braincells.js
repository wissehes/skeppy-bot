const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {
    const { braincells } = await client.getUser(message.author)

    const tipMessage = (braincells < 15) ? ` You can gain braincells with \`${message.settings.prefix}gain\`!` : ''

    const embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s braincells`)
        .setDescription(`**Braincells**: ${braincells}`)
        .setColor("BLUE")

    message.channel.send(tipMessage, embed);
}
exports.info = {
    name: `braincells`,
    aliases: [],
    description: `Shows you how many braincells you have left!`,
    usage: `braincells`,
    category: `Braincells`
}