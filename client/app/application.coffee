module.exports =

    initialize: ->
        # This will be tackled in another tutorial
        #SocketListener = require '../lib/socket_listener'

        # Routing management, this will be tackled in another tutorial
        Router = require 'router'
        @router = new Router()
        Backbone.history.start()

        # Makes this object immuable. Don't bother with that.
        Object.freeze this if typeof Object.freeze is 'function'