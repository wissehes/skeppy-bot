exports.run = (client, message, args) => {
  var request = require('request');
  var channel = args[0]
  if(args[0] === undefined) {
    request('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&channelId=UCzMjRlKVO9XIqH_crIFpi6w&part=snippet,id&order=date&maxResults=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        message.channel.send("This is Skeppy's latest video is: https://youtube.com/watch?v="+ info.items[0].id.videoId);
        console.log(info)
      }
    });
  }
  if(channel === 'skeppy' || channel === 'Skeppy') {
    request('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&channelId=UCzMjRlKVO9XIqH_crIFpi6w&part=snippet,id&order=date&maxResults=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        message.channel.send("This is Skeppy's latest video is: https://youtube.com/watch?v="+ info.items[0].id.videoId);
        console.log(info)
      }
    });
  }
  if(channel === 'BadBoyHalo' || channel === 'badboyhalo' || channel === 'bbh'){
    request('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&channelId=UC0lkCn7D--uMrtwAXRj_cdw&part=snippet,id&order=date&maxResults=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        message.channel.send("This is BadBoyHalo's latest video is: https://youtube.com/watch?v="+ info.items[0].id.videoId);
        console.log(info)
      }
    });
  }
  if(channel === 'a6d' || channel === 'A6d' || channel === 'A6D'){
    request('https://www.googleapis.com/youtube/v3/search?key='+client.config.YTapikey+'&channelId=UCbyS9AQt6KE0XUuGqXya90A&part=snippet,id&order=date&maxResults=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        message.channel.send("This is a6d's latest video is: https://youtube.com/watch?v="+ info.items[0].id.videoId);
        console.log(info)
      }
    });
  }

}
