Bookmark = require('../models/bookmark');
module.exports = Bookmarks = Backbone.Collection.extend({
    model: Bookmark,
    url: 'bookmarks'
});