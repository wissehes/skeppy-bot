exports.run = (client, message, args) => {
    const embed = {
      "title": "Candad",
      "description": "Candad is the country [Skeppy](https://www.youtube.com/channel/UCzMjRlKVO9XIqH_crIFpi6w) and [A6d](https://www.youtube.com/channel/UCbyS9AQt6KE0XUuGqXya90A) reside in.",
      "url": "https://duck.com",
      "color": 11007,
      "timestamp": new Date(),
      "footer": {
        "icon_url": "http://logos-download.com/wp-content/uploads/2016/03/McDonalds_logo_red_America_USA.png",
        "text": "Brought to you by McDonald's"
      },
      "thumbnail": {
        "url": "https://media3.giphy.com/media/2WZFqY4MsWdEI/giphy.gif"
      },
      "image": {
        "url": "https://media3.giphy.com/media/2WZFqY4MsWdEI/giphy.gif"
      },
      "author": {
        "name": "Skeppy's Chicken",
        "url": "https://skeppy-chicken.tumblr.com",
        "icon_url": "https://66.media.tumblr.com/avatar_8478c2bf52a0_128.pnj"
      },
      "fields": [
        {
          "name": "Country name",
          "value": "Candad"
        },
        {
          "name": "Most used emoji",
          "value": ":beginner:"
        },
        {
          "name": "Most used minecraft hack",
          "value": "Pingspoofing"
        },
        {
          "name": "Biggest fastfood chain",
          "value": "McDonald's",
          "inline": true
        },
        {
          "name": "Most used search engine",
          "value": "[DuckDuckGo](https://duckduckgo.com)",
          "inline": true
        }
      ]
    };
    message.channel.send({ embed });
  }
