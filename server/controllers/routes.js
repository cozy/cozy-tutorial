var bookmarks;

bookmarks = require('./bookmarks');

module.exports = {
  'bookmarkid': {
    param: bookmarks.getOne
  },
  'bookmarks': {
    get: bookmarks.all,
    post: bookmarks.create
  },
  'bookmarks/:bookmarkid/?': {
    del: bookmarks.destroy
  }
};
