exports.run = (client, message, args) => {
  var braincells = Math.floor((Math.random() * 1000) + -1000);
  message.reply('you have exactly '+braincells+' braincells left');
}
