
action 'all', ->
    Bookmark.all (err, bookmarks) ->
        if err
            send error: true, msg: "Server error occured while retrieving data."
        else
            send bookmarks
