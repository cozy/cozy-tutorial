Bookmark = require '../models/bookmark'

module.exports = class BookmarkCollection extends Backbone.Collection

    model: Bookmark
    url: 'bookmarks'

    constructor: (@view) ->
        super()

        @bind "add", @view.renderOne
        @bind "reset", @view.renderAll
