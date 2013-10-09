// The function called from index.html
$(document).ready(function() {
    var app = require('application');

    var locale = 'en'; // default locale

    // we'll need to tweak the server to allow this
    $.ajax('cozy-locale.json', {
        success: function(data) {
            locale = data.locale
            initializeLocale(locale);
        },
        error: function() {
            initializeLocale(locale);
        }
    });

    // let's define a function to initialize Polyglot
    var initializeLocale = function(locale) {
        var locales = {};
        try {
            locales = require('locales/' + locale);
        }
        catch(err) {
            locales = require('locales/en');
        }

        var polyglot = new Polyglot();
        // we give polyglot the data
        polyglot.extend(locales);

        // handy shortcut
        window.t = polyglot.t.bind(polyglot);
        app.initialize();
    };
});
