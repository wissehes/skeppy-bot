exports.run = (client, message, args) => {
    //ignore dm's
    if (message.channel.type === 'dm')
        return message.channel.send(`You need to be in a server to use this command.`);

    const Discord = require("discord.js");
    const SQLite = require("better-sqlite3");
    const sql = new SQLite('./scores.sqlite');

    if (!message.settings.levels) {
        return message.channel.send(`❌ | Levels aren't enabled in this server!`);
    }

    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.MessageEmbed()
        .setTitle("Leaderboard")
        .setAuthor(client.user.username, client.user.avatarURL)
        //.setDescription("Our top 10 points leaders!")
        .setColor(0x00AE86);

    if (top10.length < 10) {
        embed.setDescription(`Our top ${top10.length} points leaders!`)
    } else {
        embed.setDescription(`Our top 10 points leaders!`)
    }

    for (let i = 0; i < top10.length; i++) {
        try {
            embed.addField(`${i+1}. ${client.users.resolve(top10[i].user).tag}`, `${top10[i].points} points (level ${top10[i].level})`);
        } catch {
            embed.addField(`*error occurred!*`, `*User not found!*`);
        }
    }
    return message.channel.send({ embed });
}
exports.info = {
    name: `leaderboard`,
    aliases: [],
    description: `Shows the leaderboard in levels of this server!`,
    usage: `leaderboard`,
    category: `Levels`
}