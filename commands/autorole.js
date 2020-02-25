const { RichEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    if(!message.guild.me.hasPermission("MANAGE_ROLES")){
        return message.channel.send("I don't have permissions to manage roles!")
    }
    if(!message.member.hasPermission("MANAGE_ROLES")){
        return message.reply("You need `MANAGE_ROLES` permisson!")
    }

    /*if(!args[0]){
        return message.reply("please tell me which level I should give a role to or if you want to remove a role!")
    }*/
    const DB = await client.autorole.get(message.guild.id)
    if(!args[0] || args[0] == "list" || args[0] == "rules") {
        if(!DB) {
            return message.reply("there are no rules yet!")
        }
        const rolesList = Object.keys(DB).map(e => {
            return `**Level**: ${e}. **Name**: ${message.guild.roles.get(DB[e]).name || `*deleted*`}`;
        })
        if(rolesList.length < 1){
            return message.reply("there are no rules yet!")
        }
        const embed = new RichEmbed()
            .setTitle(`List of autorole rules!`)
            .setColor("BLUE")
            .setDescription(rolesList.join("\n"))

        return message.channel.send(embed)
    }

    if(args[0] === "remove" || args[0] === "delete"){
        if(!DB) {
            return message.reply("there are no rules yet!")
        }
        const DB = client.autorole.get(message.guild.id)
        const deletableRoles = Object.keys(DB).map(e => {
            return `**Level**: ${e}. **Name**: ${message.guild.roles.get(DB[e]).name || `*deleted*`}`;
        })
        if(deletableRoles.length < 1){
            return message.reply("there are no rules yet!")
        }
        const embed = new RichEmbed()
            .setTitle(`Removing autorole rule!`)
            .setColor("BLUE")
            .setDescription(`${deletableRoles.join("\n")}\n\n**Say the number of the level**`)
        const filter = response => {
            return message.author.id == response.author.id && !isNaN(response.content)
        };
        message.channel.send(embed).then(() => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
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
                    message.channel.send("Time ran out!");
                });
            });

        return;
    }

    if(isNaN(args[0])){
        return message.reply("the level should be a number!")
    }

    const roles = message.guild.roles.filter(e => e.editable && !e.deleted && e.name !== "@everyone")
    const rolesMap = roles.map(e => {
        if(!e.deleted && e.editable){
            return `• **${e.name}**`
        }
    })
    const level = args[0]
    const embed = new RichEmbed()
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
                const role = message.guild.roles.find(role => role.name.toLowerCase() == collected.first().content.toLowerCase())
                client.autoroleSettings.set(message.guild, { [level]: role.id })
                message.channel.send(`When you reach level **${args[0]}**, you will get \`${role.name}\` role!`);
                msg.edit(new RichEmbed()
                .setTitle(`Selection closed.`)
                )
            })
            .catch(collected => {
                message.channel.send("Time ran out!");
                m.then(m => {
                    m.edit(new RichEmbed()
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