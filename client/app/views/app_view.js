module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    render: function() {
        this.$el.html(this.template({
            bookmarks: this.collection.toJSON()
        }));

        return this;
    }
});