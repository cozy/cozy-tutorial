(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  module.exports = {

      initialize: function() {
          var Router = require('router');
          this.router = new Router();
          Backbone.history.start();
      }
  };
});
window.require.register("collections/bookmarks", function(exports, require, module) {
  Bookmark = require('../models/bookmark');
  module.exports = Bookmarks = Backbone.Collection.extend({
      model: Bookmark,
      url: 'bookmarks'
  });
});
window.require.register("initialize", function(exports, require, module) {
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
  
});
window.require.register("locales/en", function(exports, require, module) {
  module.exports = {
      "main title": "Welcome on My Own Bookmarks",
      "main description": "This application will help you manage your bookmarks!",
      "form title label": "Title",
      "form url label": "Url",
      "form submit button": "Add a new bookmark",
      "delete button": "delete"
  }
});
window.require.register("locales/fr", function(exports, require, module) {
  module.exports = {
      "main title": "Bienvenue sur My Own Bookmarks",
      "main description": "Cette application vous permet de gérer vos marque-pages !",
      "form title label": "Titre",
      "form url label": "Url",
      "form submit button": "Ajouter un nouveau marque-page",
      "delete button": "supprimer"
  }
});
window.require.register("models/bookmark", function(exports, require, module) {
  module.exports = Bookmark = Backbone.Model.extend({

  });
});
window.require.register("router", function(exports, require, module) {
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
});
window.require.register("templates/bookmark", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<a');
  buf.push(attrs({ 'href':(bookmark.url) }, {"href":true}));
  buf.push('>');
  var __val__ = bookmark.title
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</a>&nbsp;- (<a class="delete">delete</a>)');
  }
  return buf.join("");
  };
});
window.require.register("templates/home", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h1>');
  var __val__ = t('main title')
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</h1><p>');
  var __val__ = t('main description')
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</p><form><label>');
  var __val__ = t('form title label')  + ':'
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</label><input type="text" name="title"/><label>');
  var __val__ = t('form url label') + ':'
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</label><input type="text" name="url"/><input');
  buf.push(attrs({ 'id':("add-bookmark"), 'type':("submit"), 'value':("" + (t('form submit button')) + "") }, {"id":true,"type":true,"value":true}));
  buf.push('/></form><ul></ul>');
  }
  return buf.join("");
  };
});
window.require.register("views/app_view", function(exports, require, module) {
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
});
window.require.register("views/bookmark", function(exports, require, module) {
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
});
