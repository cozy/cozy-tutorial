var americano = require('americano');

module.exports = {
    common: [
        americano.bodyParser(),
        americano.methodOverride(),
        americano.errorHandler({
            dumpExceptions: true,
            showStack: true
        }),
        americano.static(__dirname + '/../public', {
            maxAge: 86400000
        })/*,
        americano.set('views', __dirname + '/../client'),
        americano.engine('.html', require('jade').__express)*/
    ],
    development: [
        americano.logger('dev')
    ],
    production: [
        americano.logger('short')
    ],
    plugins: [
        'americano-cozy'
    ]
};