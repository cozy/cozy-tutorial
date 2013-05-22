BookmarksView = require 'views/bookmarks_view'
BookmarkCollection = require 'collections/bookmark_collection'

module.exports = class Router extends Backbone.Router

    routes:
        '': 'main'

    main: ->
        # We create the collection here but do it where it fits the better for
        # your case.
        mainView = new BookmarksView
                            collection: new BookmarkCollection()
        mainView.render()