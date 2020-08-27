const Discord = require("discord.js");

const fs = require("fs");
const Lavalink = require('discord.js-lavalink');
const axios = require('axios');
const Twitter = require('twitter');
const DBL = require("dblapi.js");
const internetradio = require('node-internet-radio');
const api = require('./api')
const Keyv = require("keyv")

const config = require("./config.json");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

const newSettings = new Keyv(config.mongodb, { collection: "settings" })

const autorole = new Keyv(config.mongodb, { collection: 'autorole' })
const stats = new Keyv(config.mongodb, { collection: "executedCommands" })
const defaultSettings = {
    np: true,
    levels: false,
    welcome: false,
    welcomeMessage: "Welcome {{user}} to the server!",
    welcomeChannel: "welcome",
    prefix: "skeppy"
}
client.autorole = autorole
client.stats = stats
client.defaultSettings = defaultSettings;
client.config = config;
//client.npSettings = npSettings;
client.settings = newSettings;
const braincellCooldown = new Set();
client.braincellCooldown = braincellCooldown;

require("./mongo/functions")(client)
require("./mongo/braincell_functions")(client)

client.mongoose = require('./mongo/mongoose');

client.queue = {};
client.musicSettings = {};

//Twitter API login

let t;
try {
    t = new Twitter({
        consumer_key: config.twitterConsumer,
        consumer_secret: config.twitterConsumerSecret,
        access_token_key: config.twitterTokenKey,
        access_token_secret: config.twitterTokenSecret
    });
    //Bind 't' to 'client'
    client.t = t;
} catch (e) { } // If it errors, silently fail and do nothing.

Discord.Collection.betterForEach = async (callback) => {
    for (let index = 0; index < this.size; index++) {
        await callback(this.array()[index], index, this.array());
    }
}

function pingLavalinkNodes() {
    config.lavalink.nodes.forEach(a => {
        // If Lavalink node is using Glitch, ping the node to keep it alive.
        if (!a.host.includes('glitch.me') && !a.address.includes('glitch.me')) return;

        axios.get(`${a.address.startsWith('ws') ? (a.address.startsWith('ws://') ? a.address.slice(2) : (a.address.startsWith('wss://') ? a.address.slice(3) : (a.address.startsWith('http') ? a.address : ('https://' + a.address)))) : (a.address.startsWith('http') ? a.address : ('https://' + a.address))}`)
            .then(() => { })
            .catch(() => { });
    });
}

setInterval(pingLavalinkNodes, 260000);

const startLavalink = () => {
    if (client.player.notAvailable) {
        client.player = new Lavalink.PlayerManager(client, config.lavalink.nodes, {
            user: client.user.id
        });
        client.player.nodes.array().forEach(a => {
            a.manager.on('ready', () => {
                console.log(`Node ${a.host} is ready!`);
            });

            a.manager.on('error', (e) => {
                console.log(`Node ${a.host} encountered an error: ${e.stack}`);
            });

            a.manager.on('disconnect', (r) => {
                console.log(`Node ${a.manager.host} has disconnected with reason ${r}`);
            });

            a.manager.on('reconnecting', (r) => {
                console.log(`Node ${a.manager.host} is currently reconnecting...`);
            });
        });
    }
}

setInterval(startLavalink, 260000)

client.on("ready", () => {
    api.run(client)
    pingLavalinkNodes();
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    client.user.setActivity(`for "skeppy help" in ${client.guilds.cache.size} servers | skeppybot.xyz`, { type: "WATCHING" });

    //---levels---
    // Check if the table "points" exists.
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    // And then we have two prepared statements to get and set the score data.
    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    client.deleteScore = sql.prepare("DELETE FROM scores WHERE user = ? AND guild = ?")
    client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");

    // Start DBL if there's an API key present.
    if (config.DBLApiKey && config.DBLApiKey.length > 1) {
        let dbl = new DBL(config.DBLApiKey, client);
        client.dbl = dbl;
        setInterval(() => {
            dbl.postStats(client.guilds.cache.size);
        }, 1800000);
    }
    client.player = {
        notAvailable: tfs.runcate
    }
    try {
        startLavalink()
    } catch (e) {
        console.error(e)
        client.player.notAvailable = true
    }
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
        if (!props.info) return;
        if (props.info.aliases) {
            for (i = 0; i < props.info.aliases.length; i++) {
                client.aliases.set(props.info.aliases[i], props)
            }
        }
        //client.commandsInfo.set(`commands`, props.info, props.info.name)
        //client.commandsInfo.push(`categories`, props.info.category)
        //client.commandsInfo.set(`CAT_${props.info.category.toLowerCase()}`, props.info, props.info.name)
    });
});

client.reloadAllCommands = function () {
    client.commands = new Discord.Collection();
    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./commands/${file}`);
            let commandName = file.split(".")[0];
            console.log(`[reload] Attempting to load command ${commandName}`);
            client.commands.set(commandName, props);
        });
    });
}

client.on("guildMemberAdd", async (member) => {
    if (member.guild) {
        try {
            //const defaultSettings = client.npSettings.ensure(member.guild.id, client.defaultSettings);
            const welcomeSettings = await client.getGuild(member.guild)

            if (welcomeSettings.welcome) {

                let welcomeMessage = welcomeSettings.welcomeMessage;

                welcomeMessage = welcomeMessage.replace("{{user}}", member.user.toString())
                    .replace('{{usertag}}', member.user.tag)
                    .replace('{{username}}', member.user.username)

                // we'll send it to the welcome channel.
                const channel = member.guild.channels.resolve(welcomeSettings.welcomeChannel)
                if (!channel) {
                    member.guild.channels.cache
                        .find(channel => channel.name === welcomeSettings.welcomeChannel)
                        .send(welcomeMessage)
                        .catch(console.log);
                } else {
                    channel.send(welcomeMessage)
                        .catch(console.log)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
});

client.mongoose.init();
client.login(config.token);

client.getYTLength = (millisec) => {
    // Credit: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }
    // Normally I'd give notes here, but I actually don't understand how this code works.
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}

client.getQueue = (server) => {
    if (!client.queue[server]) client.queue[server] = [];
    return client.queue[server];
}

client.execQueue = async (message, queue, player, isfirst = false) => {
    if (client.musicSettings[message.guild.id] && client.musicSettings[message.guild.id].shuffle) {
        var th = Math.floor(Math.random() * queue.length);
        queue.unshift(queue[th]);
        queue.splice(th + 1, th + 1);
    }
    player.play(queue[0].track);
    if (!isfirst) {
        const npSetting = await client.getGuild(message.guild)
        if (npSetting.np) {
            let length = client.getYTLength(queue[0].info.length)
            let song = queue[0].info.title
            if (queue[0].info.length >= 9223372036854776000) {
                length = `Live`
                getStreamMeta(queue[0].info.uri)
                    .then((song) => {
                        song = song
                    })
            }
            async function getStreamMeta(url) {
                return new Promise((resolve) => {
                    internetradio.getStationInfo(url, function (error, station) {
                        song = station.title;
                        resolve(song);
                    });
                });
            }
            var requestedBy = client.users.resolve(queue[0].requestedBy)
            var name = requestedBy.username
            var avatarURL = requestedBy.avatarURL
            message.guild.channels.resolve(queue[0].channel).send(new Discord.MessageEmbed()
                .setColor("0357ff")
                .setAuthor(`Now playing`, avatarURL)
                .setTitle(song)
                .setThumbnail(`https://i.ytimg.com/vi/${queue[0].info.identifier}/hqdefault.jpg`)
                .setURL(queue[0].info.uri)
                .setFooter(`Added by ${name} | Length: ${length}`));
        }
    }

    //message.channel.send(`Now playing **${queue[0].info.title}**`);

    player.once('end', async (r) => {
        if (!client.musicSettings[message.guild.id] || client.musicSettings[message.guild.id].loop == 0)
            queue.shift();
        else if (client.musicSettings[message.guild.id].loop == 2) {
            queue.push(queue[0]);
            queue.shift();
        }
        if (queue.length > 0) {
            setTimeout(() => {
                clearInterval(client.execQueue.checkSize)
                client.execQueue(message, queue, player);
            }, 1000);
        } else {
            message.channel.send(`Queue is now empty! Leaving the voice channel.`);
            client.queue[message.guild.id] = [];
            await client.player.leave(message.guild.id);
            if (client.musicSettings[message.guild.id])
                client.musicSettings[message.guild.id] = [];
        }
    });
}

Array.prototype.move = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 &&
        0 <= pos1 && pos1 <= this.length &&
        0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
}

process.on('uncaughtException', async function (error) {
    if (error.stack.includes(`Error: Unexpected server response:`)) {
        console.error(`A Lavalink node went offline!`);
    } else {
        console.error(`[Uncaught Exception] ${error.stack}`);
        process.exit(1);
    }
});
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));