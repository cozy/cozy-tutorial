var bookmarks = require('./bookmarks');

module.exports = {
  'bookmarks': {
    get: bookmarks.list
  },
  'add': {
    post: bookmarks.add
  },
  'delete/:id': {
    get: bookmarks.delete
  }
};