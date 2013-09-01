var americano, port;

americano = require('americano');

process.on('uncaughtException', function(err) {
  console.error(err);
  console.error(err.stack);
});

port = process.env.PORT || 9260;

americano.start({
  name: 'bookmarks',
  port: port
});
