const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const Lavalink = require('discord.js-lavalink');
const axios = require('axios');

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
//client.music = require("discord.js-musicbot-addon");
client.queue = {};

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
  pingLavalinkNodes();
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`for "${config.prefix}help" | Serving ${client.guilds.size} servers`, {type: "WATCHING"});
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
});

// Following the previous example.
/*client.music.start(client, {
  // Set the api key used for YouTube.
  youtubeKey: config.YTapikey,

  // The PLAY command Object.
  play: {
    enabled: false,
    // Usage text for the help command.
    usage: "{{prefix}}play some tunes",
    // Whether or not to exclude the command from the help command.
    exclude: false
  },

  help: {
    name: "musichelp"
  },

  loop: {
    enabled: false,
    exclude: true
  },

  leave: {
    enabled: true,
    alt: ['stop']
  },

  volume: {
    enabled: true,
    alt: ['vol', 'v']
  },

  skip: {
    enabled: true
  },

  clearqueue: {
    enabled: true
  },

  np: {
    enabled: true,
    alts: ['nowplaying']
  },

  remove: {
    enabled: true
  },

  queue: {
    enabled: true
  },

  pause: {
    enabled: false,
    exclude: true
  },

  resume: {
    enabled: false,
    exclude: true
  },

  //set the prefix
  botPrefix: config.prefix,
  // Make it so anyone in the voice channel can skip the
  // currently playing song.
  anyoneCanSkip: true,

  // Make it so the owner (you) bypass permissions for music.
  ownerOverMember: true,
  ownerID: client.config.ownerID,

  // The cooldown Object.
  cooldown: {
    // This disables the cooldown. Not recommended.
    enabled: false
  }
});*/

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.on("guildMemberAdd", (member) => {
  if(config.guilds.includes(member.guild.id)){ // only run when user joins my server
    if(member.guild)
    var guild = member.guild; // Reading property `guild` of guildmember object.
    let memberTag = member.user.id; // GuildMembers don't have a tag property, read property user of guildmember to get the user object from it
    if(guild.systemChannel){ // Checking if it's not null
      guild.systemChannel.send(`Welcome ${member.user.toString()} to the server!`);
    }
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

client.execQueue = (message, queue, player) => {
	player.play(queue[0].track);
	message.channel.send(`Now playing **${queue[0].info.title}**`);

	player.once('end', async (r) => {
		queue.shift();
		if(queue.length > 0) {
			setTimeout(() => {
				client.execQueue(message, queue, player);
			}, 1000);
		} else {
			message.channel.send(`Queue is now empty! Leaving the voice channel.`);
			await client.player.leave(message.guild.id);
		}
	});
}

process.on('uncaughtException', async function (error) {
	if(error.stack.includes(`Error: Unexpected server response:`)) {
		console.error(`A Lavalink node went offline!`);
	} else {
		console.error(`[Uncaught Exception] ${error.stack}`);
		process.exit(1);
	}
});
