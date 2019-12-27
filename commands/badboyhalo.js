exports.run = (client, message, args) => {
  function getBadboy() {
    var badboy = [
        "BaldBoyHalo",
        "BadBoyHalo is bald! https://i.imgur.com/Zf0y01c.jpg",
        "bad",
        "pineconie",
        "PINECONES FOR BREAKFAST!",
        "i'm a potato-to-to",
        "https://www.youtube.com/watch?v=r7JQ6wApR-4",
        "VSCOBoyHalo",
        "turtle turtle turtle :turtle:"
        ];
    return badboy[Math.floor(Math.random() * badboy.length)];
  }
  
  var badboy = getBadboy();
  message.channel.send(badboy)
}
exports.info = {
  name: `badboyhalo`,
  aliases: [],
  description: `BadBoyHalo command gives you something.`,
  usage: `badboyhalo`,
  category: `TheTrio`
}