const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
client.music = require("discord.js-musicbot-addon");


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`say "skeppy help" | Serving ${client.guilds.size} servers`);
});

// Following the previous example.
client.music.start(client, {
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
      guild.systemChannel.send("Welcome <@" + memberTag + "> to the server! Try me out in <#579374195860045856>, ``skeppy help``");
    }
  }
});

client.login(config.token);
