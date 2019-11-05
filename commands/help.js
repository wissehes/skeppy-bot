const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');

exports.run = (client, message, args) => {
  const prefixes = client.config.prefix.join(", ");
  const prefix = client.config.prefix[0]
  if(!args[0]){
    var embed = new Discord.RichEmbed()
      .setTitle("Skeppy Bot Commands")
      .setDescription(`Make sure you use one of the prefixes: ${prefixes}`)
      .setThumbnail('https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg')
      .setURL('https://github.com/thechicken14/skeppy-bot')
      .setFooter('Made by TheChicken#5845', 'https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg')
      .setTimestamp()
      .addField(prefix + 'help commands', 'Shows a list of the default commands accessible by everyone', true)
      .addField(prefix + 'help music', 'Shows the musiccommands', true)
      .addField(prefix + 'help admincommands', 'Shows the admincommands', true)
    message.channel.send(embed)
  }
  if(args[0] == "commands"){
    const oldembed = {
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
            "name": prefix+"meme",
            "value": "Sends a random meme related to The Trio"
          },
          {
            "name": prefix+"BadBoyHalo",
            "value": "Sends a random meme related to BadBoyHalo"
          },
          {
            "name": prefix+"braincells",
            "value": "Sends how many braincells you have left"
          },
          {
            "name": prefix+"candad",
            "value": "Sends information about Candad"
          },
          {
            "name": prefix+"chicken",
            "value": "Sends a random picture of a chicken"
          },
          {
            "name": prefix+"help",
            "value": "Sends help"
          },
          {
            "name": prefix+"pinecone",
            "value": "Sends a picture of a pincone"
          },
          {
            "name": prefix+"ping or skeppy pingspoof",
            "value": "I think you know what this is"
          },
          {
            "name": prefix+"sotp",
            "value": "sotp"
          },
          {
            "name": prefix+"say",
            "value": "Make skeppy say something!"
          },
          {
            "name": prefix+"latest video",
            "value": "Shows the latest video of the channel you specify!"
          },
          {
            "name": prefix+"latest tweet",
            "value": "Shows Skeppy's latest tweet!"
          }
        ]
    };
    var help1 = new Discord.RichEmbed()
    .addField(`${prefix}meme`, `Sends a random meme related to The Trio`)
    .addField(`${prefix}BadBoyHalo`, `Sends a random meme related to BadBoyHalo`)
    .addField(`${prefix}braincells`, `Sends the number of your braincells`)
    .addField(`${prefix}Candad`, `Sends information about Candad`)
    .addField(`${prefix}chicken`, `Sends a random picture of a chicken`)
    .addField(`${prefix}pinecone`, `pinecone`)

    var help2 = new Discord.RichEmbed()
    .addField(`${prefix}ping`, `Gives the ping of the bot`)
    .addField(`${prefix}pingspoof`, `I think you know what this is`)
    .addField(`${prefix}sotp`, `sotp`)
    .addField(`${prefix}say`, `Make Skeppy say whatever you want!`)
    .addField(`${prefix}latest video`, `Shows the latest video of the channel you specify!`)
    .addField(`${prefix}latest tweet`, `Shows skeppy's latest tweet`)
    new Pagination.Embeds()
    .setArray([help1, help2])
    .setDeleteOnTimeout(true)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setPageIndicator(true)
    .setThumbnail("https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg")
    .setFooter("Made by TheChicken#5845")
    .setURL('https://github.com/thechicken14/skeppy-bot')
    .setColor(4285916)
    .build();
    //message.channel.send({ embed });
  }
  if(args[0] === "music"){
    message.channel.send(new Discord.RichEmbed()
      .setColor("RED")
      .setTitle(`Music help for ${client.user.tag}`)
      .setDescription(`Prefixes are: ${prefixes}`)
      .addField(`${prefix}play`, 'Adds/Plays music in your voice channel!')
      .addField(`${prefix}leave`, 'Leave the voice channel. (requires `DJ` role)')
      .addField(`${prefix}np`, 'Check out what\'s currently playing!')
      .addField(`${prefix}queue *or* q`, 'Check out the queue!')
      .addField(`${prefix}pause`, 'Pauses the player.')
      .addField(`${prefix}resume`, 'Resumes the player.')
      .addField(`${prefix}skip`, 'Skip songs in the queue!')
      .addField(`${prefix}volume *or* vol`, 'Set the current player volume! (requires `DJ` role)')
      .addField(`${prefix}earrape`, 'Toggle earrape mode (only for people with `DJ` role)')
      .setThumbnail(client.user.avatarURL)
    );
  }
  if(args[0] === "admincommands"){
    message.channel.send(new Discord.RichEmbed()
    .setTitle(`Admin commands`)
    .setDescription(`Prefixes are: ${prefixes}`)
    .addField(`${prefix}ban`, `Bans a user`)
    .addField(`${prefix}kick`, `Kicks a user`)
    .addField(`${prefix}eval`, `Evaluates code`)
  )
  }
}
