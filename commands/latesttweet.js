exports.run = (client, message, args) => {
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
  })
}
