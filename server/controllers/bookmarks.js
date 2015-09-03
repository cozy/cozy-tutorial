Bookmark = require('../models/bookmark');

module.exports.list = function(req, res) {
    Bookmark.all(function(err, bookmarks) {
        if (err != null) {
            console.log("An error has occurred -- " + err);
        } else {
            console.log(bookmarks);
            return res.status(200).json(bookmarks);
        }
    });
};

// We define a new route that will handle bookmark creation
module.exports.add = function(req, res) {
    Bookmark.create(req.body, function(err, bookmark) {
        if (err != null) {
            return res.status(500).json("An error has occurred -- " + err);
        } else {
            return res.status(200).json(bookmark);
        }
    });
};

// We define another route that will handle bookmark deletion
module.exports.delete = function(req, res) {
    Bookmark.find(req.params.id, function(err, bookmark) {
        if (err != null) {
            res.status(500).json("Bookmark couldn't be retrieved -- " + err);
        }
        else if (bookmark == null) {
            res.status(404).json("Bookmark not found");
        }
        else {
            bookmark.destroy(function(err) {
                if (err != null) {
                    res.status(500).json("An error has occurred -- " + err);
                } else {
                    return res.status(200).json('book destroyed');
                }
            });
        }
    });
};