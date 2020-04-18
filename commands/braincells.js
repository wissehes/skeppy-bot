const { MessageEmbed } = require("discord.js")
const Braincells = require("../mongo/models/Braincells")

exports.run = async(client, message, args) => {
    if (args[0] == "top") {
        const users = await Braincells.find({});
        const sorted = users.sort((a, b) => a - b);

        const map = sorted.map((e, i) => {
            return `${
                (i === 0) 
                ? '🥇'
                    : (i === 1)
                        ? '🥈'
                        : (i === 2)
                            ? '🥉'
                            : (i === 3)
                                ? '🏅'
                                    : '🔘'
            } **${e.braincells} braincells** - ${client.users.resolve(e.userId).tag || 'User tag not found'}`
        })

        if (map.length > 10) {
            map.splice(10)
        }

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Smartest users")
            .setDescription(map.join("\n"))

        message.channel.send(embed)
    } else {
        const { braincells } = await client.getUser(message.author)

        const tipMessage = (braincells < 15) ? ` You can gain braincells with \`${message.settings.prefix}gain\`!` : ''

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s braincells`)
            .setDescription(`**Braincells**: ${braincells}`)
            .setColor("BLUE")

        message.channel.send(tipMessage, embed);
    }
}
exports.info = {
    name: `braincells`,
    aliases: [],
    description: `Shows you how many braincells you have left!`,
    usage: `braincells`,
    category: `Braincells`
}