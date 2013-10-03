var bookmarks = require('./bookmarks');

module.exports = {
  '': {
    get: bookmarks.list
  },
  'add': {
    post: bookmarks.add
  },
  'delete/:id': {
    get: bookmarks.delete
  }
};