const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(!args[0]){
        const prefix = message.settings.prefix
        var embed = new Discord.RichEmbed()
        .setTitle("Latest")
        .setDescription(`Make sure you use my prefix: ${prefix}`)
        .setThumbnail('https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg')
        .setURL('https://github.com/thechicken14/skeppy-bot')
        .setFooter('Made by TheChicken#5845', 'https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg')
        .setTimestamp()
        .addField(prefix + 'latest tweet', "Skeppy's latest tweet!", true)
        .addField(prefix + 'latest video', "Shows the latest video of the channel you specify", true)
      message.channel.send(embed)
    }

    if(args[0] === "tweet"){
        client.t.get('statuses/user_timeline', {screen_name: 'Skeppy', count: '1'}, function(error, tweets, response) {
            //console.log(tweets);
            var tweet = tweets[0].text
            var screen_name = tweets[0].user.screen_name;
            var username = tweets[0].user.name;
            var tweetId = tweets[0].id_str;
            var pfp = tweets[0].user.profile_image_url_https;
            var timestamp = tweets[0].created_at;
            //console.log(tweet)
        
            const Discord = require('discord.js');
            const tweett = new Discord.RichEmbed()
                .setColor('#0099ff')
              .setAuthor(screen_name+` (@`+username+`)`, pfp, `https://twitter.com/`+username)
                .setTitle(screen_name+"'s latest tweet")
                .setURL('https://twitter.com/'+username+'/status/'+tweetId)
                .setDescription(tweet)
                .setThumbnail(pfp)
                .setTimestamp(timestamp)
                .setFooter('Powered by Twitter API');
        
            message.channel.send(tweett)
          });
    }
    if(args[0] == "video"){
        var axios = require('axios');
        var inputArgs = args.join(" ");
        const channel = inputArgs.slice(args[0].length).trim().split(/ +/g);
        //message.channel.send(channel)
        if(args[1]){
          getVideo(channel)
        }else{
          //message.channel.send(`🚫 You didn't specify a channel name!`)
          getVideo('Skeppy')
        }
      
        function getVideo(channelname) {
          axios.get('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&q='+channelname+'&part=snippet,id&order=relevance&maxResults=1&type=channel')
          .then(res => {
              const body = res.data;
              var channelid = body.items[0].id.channelId;
              return channelid;
          }).then(channelid => {
            axios.get('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&channelId='+channelid+'&part=snippet,id&order=date&maxResults=1')
            .then(res => {
              const body = res.data;
              var lastVideoId = body.items[0].id.videoId;
              message.channel.send("This is "+channelname+"'s latest video: https://youtube.com/watch?v="+ lastVideoId)
              return lastVideoId;
            }).catch(err => {
                // Handle the error somehow.
                console.log(err)
            });
          })
          .catch(err => {
            console.log(err)
          });
        }
    }

}
exports.info = {
  name: `latest`,
  aliases: [],
  description: `Shows latest tweet of skeppy or latest video of someone on YouTube`,
  usage: `latest tweet *or* latest video [channel name]`,
  category: `Misc`
}