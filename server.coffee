americano = require 'americano'

process.on 'uncaughtException', (err) ->
    console.error err
    console.error err.stack

port = process.env.PORT || 9260
americano.start name: 'bookmarks', port: port, ->
    console.log(process.memoryUsage())

