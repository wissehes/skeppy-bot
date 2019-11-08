exports.run = (client, message, args) => {
  function getMeme() {
    var memes = [
        "baldboyhalo",
        "baldiiii",
        "sotp",
        "i hav ur eyep",
        "is badboyhalo bald?",
        "i was testing",
        ":mag: :mag_right: :mag: :mag_right: :mag: :mag_right: :mag: :mag_right: :mag: :mag_right:",
        "do u sell 14?",
        "i'm pingspoofing you rn",
        "p i n g s p o o f",
        "I was testing",
        "Candad is a real country!",
        "https://www.urbandictionary.com/define.php?term=Candad",
        "https://media.discordapp.net/attachments/636292662898589696/642453088359153664/image0.jpg"
        ];
    return memes[Math.floor(Math.random() * memes.length)];
  }

  var meme = getMeme();
  if (meme === "is badboyhalo bald?"){
    message.channel.send(meme).then(message => {
      message.react('👍');
      message.react('👎');
    })
  } else {
    message.channel.send(meme);
  }
}
