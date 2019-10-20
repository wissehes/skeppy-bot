exports.run = (client, message, args) => {
  function getPingspoof() {
    var pings = ['Yes that is ONLY now allowed, do not tell anyone about this, yes?', '14', 'sotp with pingspoofing me! :disappointed_relieved: Why you bully me?!', 'no pls', 'sotp plsz'];
    return pings[Math.floor(Math.random()*pings.length)];
  }
    var pingspoof = getPingspoof()
    message.channel.send(pingspoof)
    .then(msg => {
      msg.delete(5000)
    })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}
