const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');

exports.run = (client, message, args) => {
  message.channel.send(`For help visit https://skeppybot.xyz`)
  /*const prefixes = client.config.prefix.join(", ");
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
  if(args[0] === "commands" && args[1] === "normalembed"){
    var oldembed = new Discord.RichEmbed()
    .setTitle(`My commands!`)
    .setDescription("Here's a list of commands you can use!")
    .setThumbnail("https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg")
    .setFooter("Made by TheChicken#5845")
    .setURL('https://github.com/thechicken14/skeppy-bot')
    .setColor(4285916)
    .addField(`${prefix}meme`, `Sends a random meme related to The Trio`)
    .addField(`${prefix}BadBoyHalo`, `Sends a random meme related to BadBoyHalo`)
    .addField(`${prefix}braincells`, `Sends the number of your braincells`)
    .addField(`${prefix}Candad`, `Sends information about Candad`)
    .addField(`${prefix}chicken`, `Sends a random picture of a chicken`)
    .addField(`${prefix}pinecone`, `pinecone`)
    .addField(`${prefix}ping`, `Gives the ping of the bot`)
    .addField(`${prefix}pingspoof`, `I think you know what this is`)
    .addField(`${prefix}sotp`, `sotp`)
    .addField(`${prefix}say`, `Make Skeppy say whatever you want!`)
    .addField(`${prefix}latest video`, `Shows the latest video of the channel you specify!`)
    .addField(`${prefix}latest tweet`, `Shows skeppy's latest tweet`)
    .addField(`${prefix}reddit`, `Get the hottest posts of a reddit `)
    message.channel.send(oldembed)
    return;
  }
  if(args[0] == "commands"){
    var help1 = new Discord.RichEmbed()
    .addField(`${prefix}meme`, `Sends a random meme related to The Trio`)
    .addField(`${prefix}BadBoyHalo`, `Sends a random meme related to BadBoyHalo`)
    .addField(`${prefix}braincells`, `Sends the number of your braincells`)
    .addField(`${prefix}Candad`, `Sends information about Candad`)
    var help2 = new Discord.RichEmbed()
    .addField(`${prefix}chicken`, `Sends a random picture of a chicken`)
    .addField(`${prefix}pinecone`, `pinecone`)
    .addField(`${prefix}ping`, `Gives the ping of the bot`)
    .addField(`${prefix}pingspoof`, `I think you know what this is`)
    var help3 = new Discord.RichEmbed()
    .addField(`${prefix}sotp`, `sotp`)
    .addField(`${prefix}say`, `Make Skeppy say whatever you want!`)
    .addField(`${prefix}latest video`, `Shows the latest video of the channel you specify!`)
    .addField(`${prefix}latest tweet`, `Shows skeppy's latest tweet`)
    var helpMusic = new Discord.RichEmbed()
    .addField(`${prefix}play`, 'Adds/Plays music in your voice channel!')
    .addField(`${prefix}leave`, 'Leave the voice channel. (requires `DJ` role)')
    .addField(`${prefix}np`, 'Check out what\'s currently playing!')
    .addField(`${prefix}queue *or* q`, 'Check out the queue!')
    .addField(`${prefix}pause`, 'Pauses the player.')
    .addField(`${prefix}resume`, 'Resumes the player.')
    .addField(`${prefix}skip`, 'Skip songs in the queue!')
    .addField(`${prefix}volume *or* vol`, 'Set the current player volume! (requires `DJ` role)')
    .addField(`${prefix}earrape`, 'Toggle earrape mode (only for people with `DJ` role)')
    try {
      new Pagination.Embeds()
      .setArray([help1, help2, help3])
      .setDeleteOnTimeout(true)
      .setAuthorizedUsers([message.author.id])
      .setChannel(message.channel)
      .setPageIndicator(true)
      .setTitle(`My commands!`)
      .setDescription("Here's a list of commands you can use!")
      .setThumbnail("https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg")
      .setFooter("Made by TheChicken#5845")
      .setURL('https://github.com/thechicken14/skeppy-bot')
      .setColor(4285916)
      .build()
      .catch(err)
    }
    catch(err){
      message.channel.send(`⚠️ I couldn't send the paginated help page, try \`${prefix}help commands normalembed\``)
    }

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
  }*/
}
