const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("I don't have permissions to manage roles!")
        }
        if (!message.member.hasPermission("MANAGE_ROLES") && message.author.id !== client.config.ownerID) {
            return message.reply("You need `MANAGE_ROLES` permisson!")
        }

        /*if(!args[0]){
            return message.reply("please tell me which level I should give a role to or if you want to remove a role!")
        }*/
        if (!args[0] || args[0] == "list" || args[0] == "rules") {
            const DB = await client.autorole.get(message.guild.id)
            if (!DB) {
                return message.reply("there are no rules yet!")
            }
            const rolesList = Object.keys(DB).map(e => {
                        role = message.guild.roles.resolve(DB[e])
                        return `**Level**: ${e}. **Name**: ${role ? role.name : `*deleted*`}`;
        })
        if(rolesList.length < 1){
            return message.reply("there are no rules yet!")
        }
        const embed = new MessageEmbed()
            .setTitle(`List of autorole rules!`)
            .setColor("BLUE")
            .setDescription(rolesList.join("\n"))

        return message.channel.send(embed)
    }

    if(args[0] === "remove" || args[0] === "delete"){
        const DB = await client.autorole.get(message.guild.id)
        if(!DB) {
            return message.reply("there are no rules yet!")
        }
        const deletableRoles = Object.keys(DB).map(e => {
            role = message.guild.roles.resolve(DB[e])
            return `**Level**: ${e}. **Name**: ${role ? role.name : `*deleted*`}`;
        })
        if(deletableRoles.length < 1){
            return message.reply("there are no rules yet!")
        }
        const embed = new MessageEmbed()
            .setTitle(`Removing autorole rule!`)
            .setColor("BLUE")
            .setDescription(`${deletableRoles.join("\n")}\n\n**Say the number of the level**`)
        const filter = response => {
            return message.author.id == response.author.id && !isNaN(response.content)
        };
        message.channel.send(embed).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    const level = collected.first().content
                    if(DB[level]){
                        client.autoroleSettings.removeRule(message.guild, level)
                        message.channel.send(`Rule for level **${level}** has been removed!`);
                    } else {
                        message.reply("That's not a valid rule!")
                    }
                })
                .catch(collected => {
                    console.log(collected)
                    message.channel.send("Time ran out!");
                });
            });

        return;
    }

    if(isNaN(args[0])){
        return message.reply("the level should be a number!")
    }

    const roles = message.guild.roles.cache.filter(e => e.editable && !e.deleted && e.name !== "@everyone")
    const rolesMap = roles.map(e => {
        if(!e.deleted && e.editable){
            return `• **${e.name}**`
        }
    })
    const level = args[0]
    const embed = new MessageEmbed()
        .setTitle("Type the name of the role you want to give")
        .setColor("BLUE")
        .setDescription(rolesMap.join("\n"))
        .setTimestamp()

    const filter = response => {
        return message.author.id == response.author.id && roles.some(role => role.name.toLowerCase() === response.content.toLowerCase())
    };
        
    const m = message.channel.send(embed).then((msg) => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                const role = message.guild.roles.cache.find(role => role.name.toLowerCase() == collected.first().content.toLowerCase())
                client.autoroleSettings.set(message.guild, { [level]: role.id })
                message.channel.send(`When you reach level **${args[0]}**, you will get \`${role.name}\` role!`);
                msg.edit(new MessageEmbed()
                .setTitle(`Selection closed.`)
                )
            })
            .catch(collected => {
                message.channel.send("Time ran out!");
                m.then(m => {
                    m.edit(new MessageEmbed()
                        .setTitle(`Selection closed.`)
                    )
                })
            });
        });
}
exports.info = {
    name: `autorole`,
    aliases: [],
    description: `Sets the autorole info`,
    usage: `autorole <level>`,
    category: `Levels`
}