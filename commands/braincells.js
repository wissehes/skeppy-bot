exports.run = (client, message, args) => {
  var braincells = Math.floor((Math.random() * 1000) + 1);
  message.reply('you have exactly '+braincells+' braincells left');
}
