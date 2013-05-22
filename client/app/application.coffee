module.exports =

    initialize: ->
        Router = require 'router'
        #SocketListener = require '../lib/socket_listener'

        @router = new Router()
        Backbone.history.start()

        Object.freeze this if typeof Object.freeze is 'function'