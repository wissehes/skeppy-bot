const Discord = require('discord.js');

function clean(text) { // For Eval
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
exports.run = (client, message, args) => {
  if(!['592337489084022794', '354289971361742848'].some(a => message.author.id == a)) return;
  try {
        const code = args.join(' ');
        let evaled = eval(code);
        if(typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);

        const embed = new Discord.RichEmbed()
            .setColor('GREEN')
            .setTitle('Evaluation: Success')
            .setDescription(`\`\`\`xl\n${clean(evaled)}\n\`\`\``)
        message.channel.send(embed);
    } catch (err) {
        const embed = new Discord.RichEmbed()
            .setColor('RED')
            .setTitle('Evaluation: Error')
            .setDescription(`\`\`\`xl\n${clean(err)}\n\`\`\``)
        message.channel.send(embed);
    }
}
