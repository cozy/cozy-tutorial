var express, port;

express = require('express');

process.on('uncaughtException', function(err) {
  console.error(err);
  console.error(err.stack);
});

port = process.env.PORT || 9260;
app = express();


// Routes & controllers
bookmarks = require('./server/controllers/bookmarks');

app.param('/bookmarkid', bookmarks.getOne);
app.get('/bookmarks', bookmarks.all);
app.post('/bookmarks', bookmarks.create);
app.del('/bookmarks/:bookmarkid/?', bookmarks.destroy);


// Requests
all = function(doc) { emit(doc._id, doc); };
Bookmark = require('./server/models/bookmark');

// Configuration
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler, {dumpExceptions: true, showStack: true});
//app.use(express.static(__dirname + '/client/public', {maxAge: 86400000}));
app.configure('development', function() {
  app.use(express.logger('dev'));
});
app.configure('production', function() {
  app.use(express.logger('short'));
});

Bookmark.defineRequest('all', all, function(err) {
  if (err) {
    console.log('request cannot be created');
  }
  app.listen(9260, function() {
     console.log(process.memoryUsage());
  });
});
