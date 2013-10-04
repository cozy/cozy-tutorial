var AppView = require('views/app_view');
var BookmarkCollection = require('collections/bookmarks');

var bookmarks = new BookmarkCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
            collection: bookmarks
        });
        mainView.render();
    }
});