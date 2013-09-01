var Bookmark, db;

db = require('./db');

module.exports = Bookmark = db.define('Bookmark', {
  url: String,
  title: String
});

Bookmark.all = function(params, callback) {
  return Bookmark.request("all", params, callback);
};
