exports.run = (client, message, args) => {
  var braincells = Math.floor((Math.random() * 1000) + -100);
  message.reply('you have exactly '+braincells+' braincells left');
}
exports.info = {
  name: `braincells`,
  aliases: [],
  description: `Shows you how many braincells you have left!`,
  usage: `braincells`,
  category: `Fun`
}