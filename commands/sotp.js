exports.run = (client, message, args) => {
  function getSotp() {
  var sotp = [
      "no thx",
      "maybe tomorrow",
      "maybe in a second",
      "if you listen to https://ChickenFM.com"
  ];
  return sotp[Math.floor(Math.random() * sotp.length)];
  }
  message.channel.send("hmm...")
  .then((newMessage) => {
      setTimeout(function(){
      var sotp = getSotp();
      newMessage.edit(sotp);
    }, 3000);
  });
}
