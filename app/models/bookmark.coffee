module.exports = (compound, Bookmark) ->

    Bookmark.all = (params, callback) ->
        Bookmark.request "all", params, callback
