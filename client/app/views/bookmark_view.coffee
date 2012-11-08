View = require '../lib/view'

module.exports = class BookmarkView extends View
    className: 'bookmark'
    tagName: 'div'

    constructor: (@model) ->
        super()

    template: ->
        template = require './templates/bookmark'
        template @getRenderData()
