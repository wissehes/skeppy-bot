const Canvas = require('canvas');
const Discord = require('discord.js');
//ty discordjs.guide
exports.run = async (client, message, args) => {
    if(args[0]){
        const user = message.mentions.users.first()
        if(user){
            return createImage(user);
        }
        if (!user) {
			return message.reply('Are you stupid? Just mention someone, smh');
		}
    }
    createImage(message.member.user)
    async function createImage(userMention) {
        const canvas = Canvas.createCanvas(640, 871);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('./img/furry.jpg');
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(userMention.displayAvatarURL);
        ctx.drawImage(avatar, 256.5, 145.1, 145, 145);
    
        // Use helpful Attachment class structure to process the file for you
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'furry.png');
        message.channel.send(attachment)
    }
}
