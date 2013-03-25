module.exports = class Bookmark extends Backbone.Model

    initialize: ->
        unless @isNew
            @url += "/#{@id}"

    isNew: () ->
        not @id?
