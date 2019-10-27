exports.run = (client, message, args) => {
  const embed = {
      "title": "Skeppy Bot Command List",
      "description": "Here's a list of commands you can use!",
      "url": "https://github.com/thechicken14/skeppy-bot",
      "color": 4285916,
      "timestamp": "2019-10-20T20:28:06.764Z",
      "footer": {
        "icon_url": "https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg",
        "text": "Made by trashcan#2971"
      },
      "thumbnail": {
        "url": "https://pbs.twimg.com/profile_images/1182235859036332033/bkU06kE__400x400.jpg"
      },
      "fields": [
        {
          "name": "skeppy meme",
          "value": "Sends a random meme related to The Trio"
        },
        {
          "name": "skeppy BadBoyHalo",
          "value": "Sends a random meme related to BadBoyHalo"
        },
        {
          "name": "skeppy braincells",
          "value": "Sends how many braincells you have left"
        },
        {
          "name": "skeppy candad",
          "value": "Sends information about Candad"
        },
        {
          "name": "skeppy chicken",
          "value": "Sends a random picture of a chicken"
        },
        {
          "name": "skeppy help",
          "value": "Sends help"
        },
        {
          "name": "skeppy pinecone",
          "value": "Sends a picture of a pincone"
        },
        {
          "name": "skeppy ping or skeppy pingspoof",
          "value": "I think you know what this is"
        },
        {
          "name": "skeppy sotp",
          "value": "sotp"
        },
        {
          "name": "skeppy say",
          "value": "Make skeppy say something!"
        },
        {
          "name": "skeppy musichelp",
          "value": "Shows you the help page for playing music"
        },
        {
          "name": "skeppy latestvideo",
          "value": "Shows the latest video of the channel you specify!"
        }
      ]
  };
  message.channel.send({ embed });
}
