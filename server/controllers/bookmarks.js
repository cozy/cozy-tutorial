var Bookmark;

Bookmark = require('../models/bookmark');

module.exports = {
  getOne: function(req, res, next, id) {
    Bookmark.find(id, function(err, bookmark) {
      if (err) {
        res.error(500, 'An error occured', err);
      }
      else if (!bookmark) {
        res.error(404, 'Photo not found');
      }
      else {
        req.bookmark = bookmark;
      }
      next();
    });
  },

  all: function(req, res) {
    Bookmark.all(function(err, bookmarks) {
      if (err) {
        next(err);
      } else {
        res.send(bookmarks, 200);
      }
    });
  },

  create: function(req, res) {
    Bookmark.create(req.body, function(err, bookmark) {
      if (err) {
        next(err);
      } else {
        res.send(bookmark, 200);
      }
    });
  },

  destroy: function(req, res) {

    Bookmark.find(req.params.bookmarkid, function(err, bookmark) {
      if (err) {
        next(err);
      }
      if (!bookmark) {
        res.error(404, 'Photo not found');
      }

      bookmark.destroy(function(err) {
        if (err) {
          next(err);
        } else {
          res.send({
            success: 'Bookmark successfuly deleted'
          }, 200);
        }
      });
    });
  }

};
