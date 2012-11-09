
action 'all', ->
    Bookmark.all (err, bookmarks) ->
        if err
            send error: true, msg: "Server error occured while retrieving data."
        else
            send bookmarks

action 'create', ->
    Bookmark.create req.body, (err, bookmark) =>
        if err
            send error: true, msg: "Server error while creating bookmark.", 500
        else
            send bookmark
