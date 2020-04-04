const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!args[0]) {
        var embed = new Discord.MessageEmbed()
            .setTitle(`Trio Christmas`)
    }
    if (args[0] === `server`) {
        var inviteLink = "https://discord.gg/zkyNyfb";
        message.channel.send(`The invite link for the Trio Christmas Server is ${inviteLink}`)
    }
    if (args[0] === `tweets`) {
        var howMany = (args[1]) ? args[1] : 1;
        if (howMany > 5)
            return message.reply('That amount is too high')
        client.t.get('statuses/user_timeline', { screen_name: 'triiochristmas', count: howMany }, function(error, tweets, response) {
            //console.log(tweets);
            tweets.forEach(sendMsg)
        });

        function sendMsg(tweet) {
            var tweetText = tweet.text
            var username = tweet.user.screen_name;
            var screen_name = tweet.user.name;
            var tweetId = tweet.id_str;
            var pfp = tweet.user.profile_image_url_https;
            var timestamp = tweet.created_at;
            //console.log(tweet)

            const tweett = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(screen_name + ` (@` + username + `)`, pfp, `https://twitter.com/` + username)
                .setTitle(screen_name + "'s latest tweet")
                .setURL('https://twitter.com/' + username + '/status/' + tweetId)
                .setDescription(tweetText)
                .setThumbnail(pfp)
                .setTimestamp(timestamp)
                .setFooter('Powered by Twitter API');

            message.channel.send(tweett)
        }
    }
}