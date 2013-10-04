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
  module.exports = Bookmarks = Backbone.Collection.extend({

  });
});
window.require.register("initialize", function(exports, require, module) {
  // The function called from index.html
  $(document).ready(function() {
      var app = require('application');
      app.initialize()
  });
  
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
window.require.register("templates/home", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h1>Welcome on My Own Bookmarks</h1><p>This application will help you manage your bookmarks!</p><form action="add" method="post"><label>Title:</label><input type="text" name="title"/><label>Url:</label><input type="text" name="url"/><input type="submit" value="Add a new bookmark"/></form><ul>');
   for(bookmark in bookmarks) {
  {
  buf.push('<li><a');
  buf.push(attrs({ 'href':(bookmarks[bookmark].url) }, {"href":true}));
  buf.push('>');
  var __val__ = bookmarks[bookmark].title
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</a>&nbsp;- (<a');
  buf.push(attrs({ 'href':("delete/" + (bookmarks[bookmark].id) + "") }, {"href":true}));
  buf.push('>delete</a>)</li>');
  }
   }
  buf.push('</ul>');
  }
  return buf.join("");
  };
});
window.require.register("views/app_view", function(exports, require, module) {
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
});
