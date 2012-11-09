View = require '../lib/view'

module.exports = class BookmarkView extends View
    className: 'bookmark'
    tagName: 'div'

    events:
        'click .delete-button': 'onDeleteClicked'

    constructor: (@model) ->
        super()

    template: ->
        template = require './templates/bookmark'
        template @getRenderData()

    onDeleteClicked: ->
        @$('.delete-button').html "deleting..."
        @model.destroy
            success: => @destroy()
            error: =>
                alert "Server error occured, bookmark was not deleted."
                @$('.delete-button').html "delete"
