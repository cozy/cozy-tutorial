module.exports = {

    initialize: function() {
        var Router = require('router');
        this.router = new Router();
        Backbone.history.start();
    }
};