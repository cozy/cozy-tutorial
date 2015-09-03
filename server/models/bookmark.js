americano = require('americano');

// The americano plugin wraps the "db.define" JugglingDB function in a simpler "getModel" call
module.exports = Bookmark = americano.getModel('bookmarks', {
    "id": String,
    "title": String,
    "link": { "type": String, "default": ""}
});

// You can easily define here some helpers or method for bookmarksBookmark.all = function(callback) {
Bookmark.all = function(callback) {
    Bookmark.request("all", {}, function(err, bookmarks) {
       callback(null, bookmarks);
    });
};