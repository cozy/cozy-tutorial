ViewCollection = require '../lib/view_collection'
BookmarkView  = require './bookmark_view'
BookmarkCollection = require '../collections/bookmark_collection'

module.exports = class BookmarksView extends ViewCollection
    el: '#bookmark-list'

    view: BookmarkView

    initialize: ->
        @collection = new BookmarkCollection @
