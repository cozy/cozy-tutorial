module.exports = class Bookmark extends Backbone.Model

    url: 'bookmarks'

    isNew: () ->
        not @id?
