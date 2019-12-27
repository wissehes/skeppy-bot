const Discord = require('discord.js');

exports.run = (client, message, args) => {
  //ignore dm's
  if (message.channel.type === 'dm')
      return message.channel.send(`You need to be in a server to use this command.`);

  var queue = client.getQueue(message.guild.id);
  if(!queue || queue.length == 0)
    return message.react('🚫') && message.channel.send(`No music is playing!`);

  if(client.musicSettings[message.guild.id]){
    if(client.musicSettings[message.guild.id].lock){
      if(client.musicSettings[message.guild.id].lockid !== message.author.id){
        return message.channel.send(`🔐| Music commands are locked by ${client.users.get(client.musicSettings[message.guild.id].lockid).username}`);
      }
    }
  }

      if(!args[0])
          return message.react('❌') && message.channel.send(`No volume given to set!`);
  
      if(parseInt(args[0]) > 200 || parseInt(args[0]) < 0)
          return message.react('🚫') && message.channel.send(`This volume number is unable to be set!`);
      client.player.get(message.guild.id).volume(parseInt(args[0]));
      message.react('✅')
      //message.channel.send(`Volume set to ${parseInt(args[0])}%.`);
      
    /*if([client.config.ownerID, client.config.adminID].some(a => message.author.id == a) || message.member.roles.some(r=>["DJ", "dj", "DeeJay", "deejay"].includes(r.name))){

    } else if(!message.member.roles.some(r=>["DJ", "dj", "DeeJay", "deejay"].includes(r.name)))
    return message.react('🚫') && message.channel.send('You need the `DJ` role to do that!');*/

}
exports.info = {
  name: `volume`,
  aliases: [`vol`],
  description: `Change the volume of the player`,
  usage: `volume <0-200> *or* vol <0-200>`,
  category: `Music`
}