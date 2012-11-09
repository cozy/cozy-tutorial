View = require '../lib/view'
AppRouter = require '../routers/app_router'
BookmarksView = require './bookmarks_view'
BookmarkCollection = require '../collections/bookmark_collection'

module.exports = class AppView extends View
    el: 'body.application'

    template: ->
        require './templates/home'

    initialize: ->
        @router = CozyApp.Routers.AppRouter = new AppRouter()

    afterRender: ->
        @bookmarksView = new BookmarksView()
        
        @bookmarksView.$el.html '<em>loading...</em>'
        @bookmarksView.collection.fetch
            success: => @bookmarksView.$el.find('em').remove()
