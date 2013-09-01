var americano, port;

americano = require('americano');

process.on('uncaughtException', function(err) {
  console.error(err);
  return console.error(err.stack);
});

port = process.env.PORT || 9260;

americano.start({
  name: 'bookmarks',
  port: port
}, function() {
  return console.log(process.memoryUsage());
});
