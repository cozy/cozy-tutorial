Bookmark = require '../models/bookmark_model'

module.exports = class BookmarkCollection extends Backbone.Collection

    # Model that will be contained inside the collection.
    model: Bookmark

    # This is where ajax requests the backend.
    url: 'bookmarks'