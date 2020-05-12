exports.run = (client, message, args) => {
  function getA6d() {
    var a6d = [
        "*quietly eats baguette in corner*",
        "***LOUDLY CROONCHES ON BAGUETTE BEHIND YOU***",
        "If i talk i delete this bot. (im playing minecraft by the way)",
        "outvadedlands is just great!",
        "a6d french guy",
        "a6d likes baguettes",
        "French Server Owner"
        ];
    return a6d[Math.floor(Math.random() * a6d.length)];
  }

    var a6d = getA6d();
    message.channel.send(a6d)
}
exports.info = {
  name: `a6d`,
  aliases: [],
  description: `A6d command, currently WIP.`,
  usage: `a6d`,
  category: `TheTrio`
}
