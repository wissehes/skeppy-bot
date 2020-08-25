const { MessageEmbed } = require("discord.js")

module.exports = async (client, message) => {
    if (message.author.bot) return;
    //ignore dm's
    if (message.channel.type === 'dm')
        return;

    const settings = await client.getGuild(message.guild);
    message.settings = settings

    if (message.content == "<@!" + client.user.id + ">") {
        const yes = [
            '14',
            `i'm a pingspoofer`,
            'so i trapped 100 kids in a box',
            'i have -14 braincells',
            'So I Trapped 100 Kids in a Rhombicosidodecahedron'
        ]
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(yes[Math.floor(Math.random() * yes.length)])
            .setDescription(`My prefix is \`${settings.prefix}\``)
        return message.channel.send(embed);
    }

    let score;
    if (message.guild) {
        //client.npSettings.ensure(message.guild.id, client.defaultSettings);
        if (settings.levels == true) {
            score = client.getScore.get(message.author.id, message.guild.id);
            if (!score) {
                score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
            }
            score.points++
            const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
            const autorole = await client.autorole.get(message.guild.id)
            if (autorole) {
                try {
                    for (let i = 0; i <= curLevel; i++) {
                        if (autorole[i.toString()]) {
                            const roleCheck = message.member.roles.cache.find(r => r.id === autorole[i.toString()])
                            if (!roleCheck) {
                                role = message.guild.roles.resolve(autorole[i.toString()])
                                console.log(role)
                                message.member.roles.add([role])
                                    .catch(console.log)
                            }
                        }
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            if (score.level < curLevel) {
                score.level++;
                message.reply(`You've leveled up to level **${curLevel}**!`);
            }
            client.setScore.run(score);
        }
    }

    const prefix = settings.prefix || "skeppy"

    if (message.content.toLowerCase().indexOf(prefix.toLowerCase()) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // Grab the command data from the client.commands Collection
    const cmd = client.commands.get(command);
    const incStats = async () => {
        const stats = await client.stats.get("executedCommands")
        if (stats) {
            client.stats.set("executedCommands", parseInt(stats) + 1)
        } else {
            client.stats.set("executedCommands", 1)
        }
    }

    if (cmd) {
        incStats()
        try {
            if (cmd.info.lock) {
                if (client.musicSettings[message.guild.id]) {
                    if (client.musicSettings[message.guild.id].lock) {
                        if (client.musicSettings[message.guild.id].lockid !== message.author.id) {
                            return message.channel.send(`🔐| Music commands are locked by ${client.users.resolve(client.musicSettings[message.guild.id].lockid).username}`);
                        }
                    }
                }
            }
            if (cmd.info.category == "Music" && client.player.notAvailable) {
                return message.reply("music is not available at the moment.")
            }
            cmd.run(client, message, args);
        } catch (e) {
            console.log(e)
        }
    }

    const aliasCmd = client.aliases.get(command)
    if (aliasCmd) {
        incStats()
        try {
            if (aliasCmd.info.lock) {
                if (client.musicSettings[message.guild.id]) {
                    if (client.musicSettings[message.guild.id].lock) {
                        if (client.musicSettings[message.guild.id].lockid !== message.author.id) {
                            return message.channel.send(`🔐| Music commands are locked by ${client.users.resolve(client.musicSettings[message.guild.id].lockid).username}`);
                        }
                    }
                }
            }
            if (aliasCmd.info.category == "Music" && client.player.notAvailable) {
                return message.reply("music is not available at the moment.")
            }
            aliasCmd.run(client, message, args)
        } catch (e) {
            console.log(e)
        }
    }
};