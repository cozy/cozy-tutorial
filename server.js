var http = require('http'),
    express = require('express'),
    app = express(),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('cozy');

/* We add configure directive to tell express to use Jade to
   render templates */
app.configure(function() {
    app.set('views', __dirname + '/public');
    app.engine('.html', require('jade').__express);

    // Allows express to get data from POST requests
    app.use(express.bodyParser());
});

// Database initialization
db.serialize(function() {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='bookmarks'", function(err, row) {
        if(err !== null) {
            console.log(err);
        }
        else if(row == null) {
            db.run('CREATE TABLE "bookmarks" ("title" VARCHAR(255), url VARCHAR(255))', function(err) {
                if(err !== null) {
                    console.log(err);
                }
                else {
                    console.log("SQL Table 'bookmarks' initialized.");
                }
            });
        }
        else {
            console.log("SQL Table 'bookmarks' already initialized.");
            //db.run("DROP TABLE 'bookmarks'");
        }
    });
});

// Let's define some bookmarks
var bookmarks = []
bookmarks.push({title: "Cozycloud", url: "https://cozycloud.cc"});
bookmarks.push({title: "Cozy.io", url: "http://cozy.io"});
bookmarks.push({title: "My Cozy", url: "http://localhost:9104/"});

// We render the templates with the data
app.get('/', function(req, res) {

    db.all('SELECT * FROM bookmarks ORDER BY title', function(err, row) {
        if(err !== null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            params = {
                "bookmarks": row
            }
            res.render('index.jade', params, function(err, html) {
                res.send(200, html);
            });
        }
    });

});

// We define a new route that will handle bookmark creation
app.post('/add', function(req, res) {
    //bookmarks.push(req.body);
    db.run("INSERT INTO 'bookmarks' VALUES('" + body.title + "', '" + body.url + "')", function(err) {
        if(err !== null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.redirect('/');
        }
    });
});

// We define another route that will handle bookmark deletion
app.get('/delete/:id', function(req, res) {
    bookmarks.splice(req.params.id, 1);
    res.redirect('/');
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