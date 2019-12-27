const axios = require('axios')
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    axios.get('https://api.ksoft.si/images/random-meme', {headers: {'Authorization': 'Bearer '+client.config.ksoftApi}})
    .then(res =>{
      var data = res.data
      var title = data.title
      var imageUrl = data.image_url
      var postUrl = data.source
      var sub = data.subreddit
      var upvotes = data.upvotes
      var comments = data.comments
      var author = data.author
      var redditPost = new Discord.RichEmbed()
      .setTitle(`${title}`)
      .setAuthor(`${author}`, 'https://media.discordapp.net/attachments/398235373282787348/644566893021364275/iu.png')
      .setImage(`${imageUrl}`)
      .setURL(`${postUrl}`)
      .setFooter(`👍 ${upvotes}  💬 ${comments} | ${sub}`)
      message.channel.send(redditPost)
    })
}
exports.info = {
  name: `meme`,
  aliases: [],
  description: `Shows a meme from Reddit`,
  usage: `meme`,
  category: `Fun`
}