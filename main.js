const Discord = require("discord.js");
const Enmap = require("enmap");
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
const npSettings = new Enmap({ name: 'npSettings' });
const newSettings = new Keyv(config.mongodb, { collection: "settings" })
const autorole = new Keyv(config.mongodb, { collection: "autorole" })
const stats = new Keyv(config.mongodb, { collection: "executedCommands" })
const defaultSettings = {
  np: true, 
  levels: false, 
  welcome: false, 
  welcomeMessage: "Welcome {{user}} to the server!",
  welcomeChannel: "welcome"
}
client.autorole = autorole
client.stats = stats
client.defaultSettings = defaultSettings;
client.config = config;
client.npSettings = npSettings;
const commandCooldown = new Set();
client.cooldown = commandCooldown;

let dbl;
try {
  dbl = new DBL(config.DBLApiKey, client);
} catch (e) {}
client.dbl = dbl;
//client.music = require("discord.js-musicbot-addon");
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
} catch (e) {} // If it errors, silently fail and do nothing.

Discord.Collection.betterForEach = async (callback) => {
  for (let index = 0; index < this.size; index++) {
      await callback(this.array()[index], index, this.array());
  }
}

function pingLavalinkNodes() {
	config.lavalink.nodes.forEach(a => {
    // If Lavalink node is using Glitch, ping the node to keep it alive.
    if(!a.host.includes('glitch.me') && !a.address.includes('glitch.me')) return;

    axios.get(`${a.address.startsWith('ws') ? (a.address.startsWith('ws://') ? a.address.slice(2) : (a.address.startsWith('wss://') ? a.address.slice(3) : (a.address.startsWith('http') ? a.address : ('https://' + a.address)))) : (a.address.startsWith('http') ? a.address : ('https://' + a.address))}`)
    .then(() => {})
    .catch(() => {});
  });
}

setInterval(pingLavalinkNodes, 260000);



client.on("ready", () => {
  npSettings.forEach((value, key) => {
    setTimeout(async () => {
      if(value.welcomeMessage){
        const dbRes = await newSettings.get(key)
        if(!dbRes){
          newSettings.set(key, value)
        }
      }
    }, 1000)
  })

  api.run(client)
  pingLavalinkNodes();
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`for "${config.prefix[0]}help" in ${client.guilds.size} servers | skeppybot.xyz`, {type: "WATCHING"});
  client.player = new Lavalink.PlayerManager(client, config.lavalink.nodes, {id: client.user.id});

  client.player.nodes.forEach(a => {
    a.on('ready', () => {
			console.log(`Node ${a.host} is ready!`);
		});

		a.on('error', (e) => {
			console.log(`Node ${a.host} encountered an error: ${e.stack}`);
		});

		a.on('disconnect', (r) => {
			console.log(`Node ${a.host} has disconnected with reason ${r}`);
		});

		a.on('reconnecting', (r) => {
			console.log(`Node ${a.host} is currently reconnecting...`);
		});
  });
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
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 1800000);
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
client.aliases = new Enmap();
client.commandsInfo = new Enmap();
//client.commandsInfo.set(`commandsInfo`, [])
client.commandsInfo.set(`categories`, [])
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    if(!props.info) return;
    if(props.info.aliases){
      for(i = 0; i < props.info.aliases.length; i++){
        client.aliases.set(props.info.aliases[i], props)
      }
    }
    client.commandsInfo.set(`commands`, props.info, props.info.name)
    client.commandsInfo.push(`categories`, props.info.category)
    client.commandsInfo.set(`CAT_${props.info.category.toLowerCase()}`, props.info, props.info.name)
  });
});

client.reloadAllCommands = function(){
  client.commands = new Enmap();
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

client.on("guildMemberAdd", (member) => {
    if(member.guild)
      var guild = member.guild; // Reading property `guild` of guildmember object.
      let memberTag = member.user.id; // GuildMembers don't have a tag property, read property user of guildmember to get the user object from it
      const defaultSettings = client.npSettings.ensure(member.guild.id, client.defaultSettings);
      if(client.npSettings.get(guild.id, "welcome")){
        if(!client.npSettings.has(member.guild.id, "welcomeMessage") || !client.npSettings.has(member.guild.id, "welcomeChannel")){
          return;
        }
        // First, get the welcome message using get: 
        let welcomeMessage = client.npSettings.get(member.guild.id, "welcomeMessage");
        console.log(welcomeMessage)
        // Our welcome message has a bit of a placeholder, let's fix that:
        if(welcomeMessage.includes('{{user}}'))
            welcomeMessage = welcomeMessage.replace("{{user}}", member.user.toString())
        // we'll send to the welcome channel.
        member.guild.channels
          .find("name", client.npSettings.get(member.guild.id, "welcomeChannel"))
          .send(welcomeMessage)
          .catch(console.log);      
        }
});

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
  if(!client.queue[server]) client.queue[server] = [];
  return client.queue[server];
}

client.execQueue = async (message, queue, player, isfirst = false) => {
  client.execQueue.checkSize = setInterval(() => {
    if(client.channels.get(player.channel).members.size == 1) {
      if(!player.paused){
        player.pause(true)
        message.channel.send(`⏸ | Everyone left the voice channel. The player has been paused, leaving in 10 seconds if no one joins!`)
        client.execQueue.leaveTimeout = setTimeout(() => {
          clearInterval(client.execQueue.checkSize)
          queue.splice(0, queue.length);
          client.player.leave(message.guild.id);
          if(client.musicSettings[message.guild.id])
            delete client.musicSettings[message.guild.id];
          message.channel.send(`No one joined so I'm leaving!`)
        }, 10000);    
      }
    } else {
      if(client.execQueue.leaveTimeout)
        clearTimeout(client.execQueue.leaveTimeout)
    }
  }, 1000);
  
  if(client.musicSettings[message.guild.id] && client.musicSettings[message.guild.id].shuffle) {
    var th = Math.floor(Math.random() * queue.length);
    queue.unshift(queue[th]);
    queue.splice(th + 1, th + 1);
  }
  player.play(queue[0].track);
  if(!isfirst){
    if(client.npSettings.get(message.guild.id, "np")){
      let length = client.getYTLength(queue[0].info.length)
      let song = queue[0].info.title
      if(queue[0].info.length >= 9223372036854776000){
        length = `Live`
        await getStreamMeta(queue[0].info.uri)
        .then((song) => {
          song = song
          //console.log(song)
        })
      }
      async function getStreamMeta(url){
        return new Promise((resolve) => {
          internetradio.getStationInfo(url, function(error, station) {
            song = station.title;
            console.log(station)
           resolve(song);
          });
        });
      }
      var requestedBy = client.users.get(queue[0].requestedBy)
      var name = requestedBy.username
      var avatarURL = requestedBy.avatarURL
      message.channel.send(new Discord.RichEmbed()
        .setColor("0357ff")
        .setAuthor(`Now playing`)
        .setTitle(song)
        //.setDescription(`${length}`)
        .setThumbnail(`https://i.ytimg.com/vi/${queue[0].info.identifier}/hqdefault.jpg`)
        .setURL(queue[0].info.uri)
        .setFooter(`Added by ${name} | Length: ${length}`, avatarURL));
    }
  }

	    //message.channel.send(`Now playing **${queue[0].info.title}**`);

	player.once('end', async (r) => {
    if(!client.musicSettings[message.guild.id] || client.musicSettings[message.guild.id].loop == 0)
      queue.shift();
    else if(client.musicSettings[message.guild.id].loop == 2) {
      queue.push(queue[0]);
      queue.shift();
    }
		if(queue.length > 0) {
			setTimeout(() => {
        clearInterval(client.execQueue.checkSize)
				client.execQueue(message, queue, player);
			}, 1000);
		} else {
			message.channel.send(`Queue is now empty! Leaving the voice channel.`);
      await client.player.leave(message.guild.id);
      if(client.musicSettings[message.guild.id])
        delete client.musicSettings[message.guild.id];
      if(client.execQueue.checkSize)
        clearInterval(client.execQueue.checkSize)
      if(client.execQueue.leaveTimeout)
        clearTimeout(client.execQueue.leaveTimeout)
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

process.on('uncaughtException', async function (error) {
	if(error.stack.includes(`Error: Unexpected server response:`)) {
		console.error(`A Lavalink node went offline!`);
	} else {
		console.error(`[Uncaught Exception] ${error.stack}`);
		process.exit(1);
	}
});
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
