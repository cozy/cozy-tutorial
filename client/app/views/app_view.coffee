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
        @bookmarksView.bookmarks.add [
            {title: "Cozy Cloud", url: "https://cozycloud.fr"}
            {title: "Cozy Blog", url: "http://blog.cozycloud.fr"}
        ]
