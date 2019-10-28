exports.run = (client, message, args) => {
  var axios = require('axios');
  var channel = args.join(" ");
  if(args[0]){
    getVideo(channel)
  }else{
    message.channel.send(`🚫 You didn't specify a channel name!`)
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
        message.channel.send("This is "+channel+"'s latest video is: https://youtube.com/watch?v="+ lastVideoId)
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
