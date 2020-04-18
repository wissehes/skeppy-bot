const Canvas = require('canvas');
const Discord = require('discord.js');
//ty discordjs.guide
exports.run = async(client, message, args) => {
    if (args[0]) {
        const user = message.mentions.users.first()
        if (user) {
            return createImage(user);
        }
        if (!user) {
            return message.reply('Are you stupid? Just mention someone, smh');
        }
    }
    createImage(message.author)
    async function createImage(userMention) {
        const canvas = Canvas.createCanvas(176, 176);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('./img/bald.jpg');
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(userMention.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 54.1, 72, 87, 87);

        // Use helpful Attachment class structure to process the file for you
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bald.png');
        message.channel.send(attachment)
    }
}
exports.info = {
    name: `bald`,
    aliases: [],
    description: `Puts your avatar on a bald head.`,
    usage: `bald [mention]`,
    category: `Fun`
}