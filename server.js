var http = require('http'),
    express = require('express'),
    app = express();

// At the root of your website, we show the index.html page
app.get('/', function(req, res) {
    res.sendfile('./public/index.html')
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