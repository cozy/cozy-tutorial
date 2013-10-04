Bookmark = require('../models/bookmark');

module.exports.list = function(req, res) {
    Bookmark.all(function(err, bookmarks) {
        if(err != null) {
            res.send(500, {error: "Couldn't retrieved the bookmarks."});
        }
        else {
            res.send(200, bookmarks);
        }
    });
};

// We define a new route that will handle bookmark creation
module.exports.add = function(req, res) {
    Bookmark.create(req.body, function(err, bookmark) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(201);
        }
    });
};

// We define another route that will handle bookmark deletion
module.exports.delete = function(req, res) {
    Bookmark.find(req.params.id, function(err, bookmark) {
        if(err != null) {
            res.send(500, {error: "Bookmark couldn't be retrieved -- " + err});
        }
        else if(bookmark == null) {
            res.send(404, {error: "Bookmark not found"});
        }
        else {
            bookmark.destroy(function(err) {
                if(err != null) {
                    res.send(500, {error: "An error has occurred -- " + err});
                }
                else {
                    res.send(200);
                }
            });
        }
    });
};