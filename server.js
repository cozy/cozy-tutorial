var americano = require('americano');

var port = process.env.PORT || 9250;
americano.start({name: 'bookmark', port: port}, function(app) {
    app.set('views',  __dirname + '/client');
    app.engine('.html', require('jade').__express);
});