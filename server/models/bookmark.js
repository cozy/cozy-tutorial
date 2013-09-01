var Bookmark, americano;

americano = require('americano-cozy');

module.exports = Bookmark = americano.getModel('Bookmark', {
  url: String,
  title: String
});

Bookmark.all = function(params, callback) {
  return Bookmark.request("all", params, callback);
};
