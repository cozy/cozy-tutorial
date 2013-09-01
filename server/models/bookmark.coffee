americano = require 'americano-cozy'

module.exports = Bookmark = americano.getModel 'Bookmark',
    url: String
    title: String

Bookmark.all = (params, callback) ->
    Bookmark.request "all", params, callback
