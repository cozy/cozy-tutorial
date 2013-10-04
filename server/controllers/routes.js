var bookmarks = require('./bookmarks');

module.exports = {
    'bookmarks': {
        get: bookmarks.list,
        post: bookmarks.add,
    },
    'bookmarks/:id': {
        del: bookmarks.delete
    }
};