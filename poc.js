const KEYS = require('./keys');
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: KEYS.CONSUMER_KEY,
  consumer_secret: KEYS.CONSUMER_SECRET,
  access_token_key: KEYS.ACCESS_TOKEN_KEY,
  access_token_secret: KEYS.ACCESS_TOKEN_SECRET,
});

var isKanji = function(character) {
  return 0x4e00 <= character.charCodeAt(0) && character.charCodeAt(0) <= 0x9faf;
};

var stream = client.stream('statuses/filter', {
  //track: 'javascript',
  locations: '129.484177, 30.923179, 145.985641, 45.799878',
}, function(stream) {
  stream.on('data', function(event) {
    var test = [];
    event.text.split('').forEach(character => {
        if (isKanji(character)) test.push(character);
    });

    // Play animation
    if (test.length !== 0) {
      console.log(test);
    }
  });

  stream.on('error', function(error) {
    throw error;
  })
});
