var BookmarkView = require('./bookmark');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),
    events: {
        "click #add-bookmark": "createBookmark"
    },

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onBookmarkAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the bookmarks from the database
        this.collection.fetch();
    },

    createBookmark: function(event) {
        // submit button reload the page, we don't want that
        event.preventDefault();

        // add it to the collection
        this.collection.create({
            title: this.$el.find('input[name="title"]').val(),
            url: this.$el.find('input[name="url"]').val()
        });
    },

    onBookmarkAdded: function(bookmark) {
        // render the specific element
        bookmarkView = new BookmarkView({
            model: bookmark
        });
        bookmarkView.render();
        this.$el.find('ul').append(bookmarkView.$el);
    }
});