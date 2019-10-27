exports.run = (client, message, args) => {
  var request = require('request');
  request('https://radio.chickenfm.com/api/nowplaying/1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)

    }
  });


}
