exports.run = (client, message, args) => {
  var request = require('request');
  var channel = args.join(" ");
  if(args[0] === undefined) {
    request('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&channelId=UCzMjRlKVO9XIqH_crIFpi6w&part=snippet,id&order=date&maxResults=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        message.channel.send("This is Skeppy's latest video is: https://youtube.com/watch?v="+ info.items[0].id.videoId);
        console.log(info)
      }
    });
  }
  if(channel) {
    var channelid;
    request('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&q='+channel+'&part=snippet,id&order=relevance&maxResults=1&type=channel', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        var channelid = info.items[0].id.channelId;
        request('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&channelId='+channelid+'&part=snippet,id&order=date&maxResults=1', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            message.channel.send("This is "+channel+"'s latest video is: https://youtube.com/watch?v="+ info.items[0].id.videoId);
            console.log(info.items[0].id.videoId)
          }
        });
        console.log(info)
      }
    });
  }

}
