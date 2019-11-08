module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
  //ignore dm's
  if (message.channel.type === 'dm')
      return message.channel.send('lmao, no');

  let score;
  if (message.guild) { 
    if (!client.config.noLevelServers.includes(message.guild.id)){
      score = client.getScore.get(message.author.id, message.guild.id);
      if (!score) {
        score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
      }
      score.points++;
      const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
      if(score.level < curLevel) {
        score.level++;
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      }
      client.setScore.run(score);
    }

  }

  const prefixes = require('../config.json').prefix
  let prefix = false;
  for (const thisPrefix of prefixes) {
      if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
  }
//  if(!prefix) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
