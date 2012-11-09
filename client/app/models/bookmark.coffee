module.exports = class Bookmark extends Backbone.Model

    url: 'bookmarks'

    initialize: ->
        @url += "/#{@id}"

    isNew: () ->
        not @id?
