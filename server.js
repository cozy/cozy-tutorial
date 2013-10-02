var http = require('http'),
    express = require('express'),
    app = express(),
    Schema = require('jugglingdb').Schema,
    db = new Schema('cozy-adapter', { url: 'http://localhost:9101/' });

/* We add configure directive to tell express to use Jade to
   render templates */
app.configure(function() {
    app.set('views', __dirname + '/public');
    app.engine('.html', require('jade').__express);

    // Allows express to get data from POST requests
    app.use(express.bodyParser());
});

// We define our data schema
Bookmark = db.define('bookmarks', {
    "id": String,
    "title": String,
    "url": { "type": String, "default": ""}
});

// Define the request. You need to do this only once.
var request = function(doc) {
      return emit(doc._id, doc);
};
Bookmark.defineRequest("all", request, function(err) {
    if(err != null) {
        console.log("An error occurred while declaring the request -- " + err);
    }
});

// We render the templates with the data
app.get('/', function(req, res) {
    Bookmark.request("all", {}, function(err, bookmarks) {
        if(err != null) {
            console.log("An error has occurred -- " + err);
        }
        else {
            data = {"bookmarks": bookmarks}
            res.render('index.jade', data, function(err, html) {
                res.send(200, html);
            });
        }
    });
});

// We define a new route that will handle bookmark creation
app.post('/add', function(req, res) {
    Bookmark.create(req.body, function(err, bookmark) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.redirect('back');
        }
    });
});

// We define another route that will handle bookmark deletion
app.get('/delete/:id', function(req, res) {
    Bookmark.find(req.params.id, function(err, bookmark) {
        if(err != null) {
            res.send(500, "Bookmark couldn't be retrieved -- " + err);
        }
        else if(bookmark == null) {
            res.send(404, "Bookmark not found");
        }
        else {
            bookmark.destroy(function(err) {
                if(err != null) {
                    res.send(500, "An error has occurred -- " + err);
                }
                else {
                    res.redirect('back');
                }
            });
        }
    });
});

/* This will allow Cozy to run your app smoothly but
 it won't break other execution environment */
var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app).listen(port, host, function() {
    console.log("Server listening to %s:%d within %s environment",
                host, port, app.get('env'));
});