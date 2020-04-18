const Canvas = require('canvas');
const Discord = require('discord.js');
//ty discordjs.guide
exports.run = async (client, message, args) => {
  /*function randomChicken() {
    var chickens = [
      "chicken1.jpg",
      "chicken2.jpg",
      "chicken3.jpg",
      "chicken4.jpg"
    ]
    return chickens[Math.floor(Math.random() * chickens.length)];
  }*/
    if(args[0]){
        const user = message.mentions.users.first()
        if(user){
            return createImage(user);
        }
        if (!user) {
			      return message.reply('Are you stupid? Just mention someone, smh');
		    }
    }
    createImage(message.author, )
    async function createImage(userMention) {
        const canvas = Canvas.createCanvas(720, 816);
        const ctx = canvas.getContext('2d');
        //var image = randomChicken();
        const background = await Canvas.loadImage(`./img/chickens/chicken3.jpg`);
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(userMention.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 468.1, 51.3, 163.3, 163.3);
    
        // Use helpful Attachment class structure to process the file for you
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'pinecone.png');
        message.channel.send(attachment)
    }
}
exports.info = {
  name: `chicken`,
  aliases: [],
  description: `Puts your avatar on a chicken.`,
  usage: `chicken [mention]`,
  category: `Fun`
}