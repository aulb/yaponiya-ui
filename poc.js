var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'cBAQ82QEt2luAwhyrL415hz0A',
  consumer_secret: 'sud68OlSdSLoaceKKbsmPVUSaBacNCX1l6e9YuK9BuOjx3bef1',
  access_token_key: '81681631-kvpRdgoSIOkJLLBSFG8dInFkkwuM5oBT2mwiZfRhN',
  access_token_secret: 'YqcSS8tFQpLSvtmjPkFaEloAqO9c6SxcWkQn5bRZTPZVz'
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
