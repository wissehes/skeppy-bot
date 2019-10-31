const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(!args[0]){
    const prefixes = client.config.prefix.join(", ");
    var embed = new Discord.RichEmbed()
      .setTitle("Skeppy Bot Commands")
      .setDescription("The prefixes are: " + prefixes)
      .setThumbnail('https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg')
      .setURL('https://github.com/thechicken14/skeppy-bot')
      .setFooter('Made by TheChicken#5845', 'https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg')
      .setTimestamp()
      .addField('help commands', 'Shows a list of the default commands accessible by everyone', true)
      .addField('help music', 'Shows the musiccommands', true)
      .addField('help admincommands', 'Shows the admincommands', true)
    message.channel.send(embed)
  }
  if(args[0] == "commands"){
    const embed = {
        "title": "Skeppy Bot Command List",
        "description": "Here's a list of commands you can use!",
        "url": "https://github.com/thechicken14/skeppy-bot",
        "color": 4285916,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg",
          "text": "Made by TheChicken#5845"
        },
        "thumbnail": {
          "url": "https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg"
        },
        "fields": [
          {
            "name": "meme",
            "value": "Sends a random meme related to The Trio"
          },
          {
            "name": "BadBoyHalo",
            "value": "Sends a random meme related to BadBoyHalo"
          },
          {
            "name": "braincells",
            "value": "Sends how many braincells you have left"
          },
          {
            "name": "candad",
            "value": "Sends information about Candad"
          },
          {
            "name": "chicken",
            "value": "Sends a random picture of a chicken"
          },
          {
            "name": "help",
            "value": "Sends help"
          },
          {
            "name": "pinecone",
            "value": "Sends a picture of a pincone"
          },
          {
            "name": "ping or skeppy pingspoof",
            "value": "I think you know what this is"
          },
          {
            "name": "sotp",
            "value": "sotp"
          },
          {
            "name": "say",
            "value": "Make skeppy say something!"
          },
          {
            "name": "musichelp",
            "value": "Shows you the help page for playing music"
          },
          {
            "name": "latestvideo",
            "value": "Shows the latest video of the channel you specify!"
          },
          {
            "name": "latesttweet",
            "value": "Shows Skeppy's latest tweet!"
          }
        ]
    };
    message.channel.send({ embed });
  }
  if(args[0] === "music"){
    const prefixes = client.config.prefix.join(", ");
    message.channel.send(new Discord.RichEmbed()
      .setColor("RED")
      .setTitle(`Music help for ${client.user.tag}`)
      .setDescription(`Prefixes are: ${prefixes}`)
      .addField(`play`, 'Adds/Plays music in your voice channel!')
      .addField(`leave`, 'Leave the voice channel.')
      .addField(`np`, 'Check out what\'s currently playing!')
      .addField(`queue *or* q`, 'Check out the queue!')
      .addField(`pause`, 'Pauses the player.')
      .addField(`resume`, 'Resumes the player.')
      .addField(`skip`, 'Skip songs in the queue!')
      .addField(`volume *or* vol`, 'Set the current player volume!')
      .addField(`earrape`, 'Toggle earrape mode (only for people with `DJ` role)')
      .setThumbnail(client.user.avatarURL)
    );
  }
  if(args[0] === "admincommands"){
    const prefixes = client.config.prefix.join(", ");
    message.channel.send(new Discord.RichEmbed()
    .setTitle(`Admin commands`)
    .setDescription(`Prefixes are: ${prefixes}`)
    .addField(`ban`, `Bans a user`)
    .addField(`kick`, `Kicks a user`)
    .addField(`eval`, `Evaluates code`)

  }
}
