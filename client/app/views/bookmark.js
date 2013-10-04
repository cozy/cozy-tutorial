module.exports = Bookmark = Backbone.View.extend({

    tagName: 'li',
    template: require('../templates/bookmark'),
    events: {
        'click a.delete': 'deleteBookmark'
    },

    render: function() {
        this.$el.html(this.template({
            bookmark: this.model.toJSON()
        }));
    },

    deleteBookmark: function() {
        this.model.destroy();
        this.remove();
    }
});