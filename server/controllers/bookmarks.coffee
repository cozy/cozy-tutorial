Bookmark = require '../models/bookmark'

module.exports =

    getOne: (req, res, next, id) ->
        Bookmark.find id, (err, bookmark) =>
            return res.error 500, 'An error occured', err if err
            return res.error 404, 'Photo not found' if not bookmark

            req.bookmark = bookmark
            next()

    all: (req, res) ->
        Bookmark.all (err, bookmarks) ->
            if err
                next err
            else
                res.send bookmarks, 200

    create: (req, res) ->
        Bookmark.create req.body, (err, bookmark) =>
            if err
                next err
            else
                res.send bookmark, 200

    destroy: (req, res) ->
        Bookmark.find req.params.bookmarkid, (err, bookmark) =>
            return res.error 500, 'An error occured', err if err
            return res.error 404, 'Photo not found' if not bookmark

            req.bookmark = bookmark
            req.bookmark.destroy (err) ->
                if err
                    next err
                else
                    res.send success: 'Bookmark successfuly deleted', 200
