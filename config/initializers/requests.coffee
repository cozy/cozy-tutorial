module.exports = (compound) ->

    Bookmark = compound.models.Bookmark

    all = (doc) ->
        emit doc.title, doc

    Bookmark.defineRequest "all", all, (err) ->
        if err
            compound.logger.write "Bookmark.All requests, cannot be created"
            compound.logger.write err