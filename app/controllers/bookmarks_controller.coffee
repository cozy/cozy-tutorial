before ->
    Bookmark.find req.params.id, (err, bookmark) =>
        if err or !bookmark
            send error: true, msg: "Bookmark not found", 404
        else
            @bookmark = bookmark
            next()
, only: ['destroy']


action 'all', ->
    Bookmark.all (err, bookmarks) ->
        if err
            compound.logger.write err
            send error: true, msg: "Server error occured while retrieving data.", 500
        else
            send bookmarks, 200

action 'create', ->
    Bookmark.create req.body, (err, bookmark) =>
        if err
            compound.logger.write err
            send error: true, msg: "Server error while creating bookmark.", 500
        else
            send bookmark, 200

action 'destroy', ->
    @bookmark.destroy (err) ->
        if err
            compound.logger.write err
            send error: 'Cannot destroy bookmark', 500
        else
            send success: 'Bookmark succesfuly deleted', 200
