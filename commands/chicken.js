exports.run = (client, message, args) => {
  function getChicken() {
  var chickens = [
      "https://i.imgur.com/7ehJlAq.jpg",
      "https://i.imgur.com/MKpnUn7.jpg",
      "https://i.imgur.com/sXSPQMk.png",
      "https://i.imgur.com/lfjeb5u.png",
      "https://i.imgur.com/g36UjJk.png",
      "https://i.imgur.com/TnkbNOm.png",
      "https://i.imgur.com/ggS5RF2.png",
      "https://i.imgur.com/oY1ED5Q.jpg",
      "https://i.imgur.com/FCNlO6p.png",
      "https://i.imgur.com/Meytrjb.png",
      "https://i.imgur.com/Ltt2yxz.jpg",
      "https://i.imgur.com/gQKgAVU.png"
  ];
  return chickens[Math.floor(Math.random() * chickens.length)];
  }
  var chicken = getChicken();
  message.channel.send("Chicken!", {file: chicken})
}
