const Discord = require('discord.js');
const axios = require('axios')
exports.run = (client, message, args) => {
    if(!args[0]){
        sendReddit('skeppy')
    }
    if(args[0] == "meme"){
        sendReddit('memes')
    }   

    function sendReddit(subreddit){
        axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=20`)
        .then(res => {
            //var data = res.data;
            //var postData = res.data.data.children[0].data
            var array = res.data.data.children
            var postDataAlmost = array[Math.floor(Math.random() * array.length)];
            var postData = postDataAlmost.data
            var title = postData.title
            var imageUrl = postData.url
            var author = postData.author
            var permalink = postData.permalink
            var upvotes = postData.ups
            var sub = postData.subreddit_name_prefixed
            var redditPost = new Discord.RichEmbed()
            .setTitle(`${title}`)
            //.setAuthor(`By u/${author}`)
            .setImage(`${imageUrl}`)
            .setURL(`https://reddit.com${permalink}`)
            .setFooter(`👍 ${upvotes} | By u/${author} | ${sub}`)
    
            return message.channel.send(redditPost)
        })
    }

}