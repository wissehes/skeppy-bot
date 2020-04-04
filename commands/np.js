const Discord = require('discord.js');
const internetradio = require('node-internet-radio');

exports.run = async(client, message, args) => {
    var settings = client.getGuild(message.guild)
    if (args[0]) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return;
        } else {
            switch (args[0]) {
                case 'off':
                    client.updateGuild(message.guild, { np: false })
                    message.channel.send(`Now playing messages are now turned **off**`)
                    break;

                case 'on':
                    client.updateGuild(message.guild, { np: true })
                    message.channel.send(`Now playing messages are now turned **on**`)
                    break;
            }
            if (args[0] == "off") {

            }
            if (args[0] == "on") {

            }
        }
        return;
    }
    var queue = client.getQueue(message.guild.id);
    if (!queue || queue.length == 0)
        return message.channel.send(`No music is playing!`);

    let time = `[${client.getYTLength(client.player.players.get(message.guild.id).state.position)} / ${client.getYTLength(queue[0].info.length)}]`;
    let song = `${queue[0].info.author} - ${queue[0].info.title}`
    if (queue[0].info.length >= 9223372036854776000) {
        time = `[${client.getYTLength(client.player.players.get(message.guild.id).state.position)} / Live]`
        await getStreamMeta(queue[0].info.uri)
            .then((song) => {
                song = song
                    //console.log(song)
            })
    }

    async function getStreamMeta(url) {
        return new Promise((resolve) => {
            internetradio.getStationInfo(url, function(error, station) {
                song = station.title;
                console.log(station)
                resolve(song);
            });
        });
    }
    var requestedBy = client.users.resolve(queue[0].requestedBy)
    var name = requestedBy.username
    var avatarURL = requestedBy.avatarURL
    message.channel.send(new Discord.MessageEmbed()
        .setColor("0357ff")
        .setAuthor(`Now playing`)
        .setTitle(song)
        .setDescription(`${time}`)
        .setThumbnail(`https://i.ytimg.com/vi/${queue[0].info.identifier}/hqdefault.jpg`)
        .setURL(queue[0].info.uri)
        .setFooter(`Requested by ${name}`, avatarURL));
}
exports.info = {
    name: `np`,
    aliases: [`nowplaying`],
    description: `Shows what's currently playing!`,
    usage: `np *or* nowplaying`,
    category: `Music`
}