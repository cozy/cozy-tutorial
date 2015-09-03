angular.module('Bookmarks', [
  'ngResource',
  'ngRoute'
]).config(appConfig);

var routeObject = {
  '/': {
    templateUrl: 'partials/home.html',
    controller: 'HomeAngCtrl',
    controllerAs: 'home'
  }
};

appConfig.$inject = ['$httpProvider', '$routeProvider'];

function appConfig($httpProvider, $routeProvider) {
  for (var path in routeObject) {
    $routeProvider.when(path, routeObject[path]);
  }
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}
;angular.module('Bookmarks').factory('Bookmark', Bookmark);

Bookmark.$inject = ['$http'];

function Bookmark($http) {

  var Bookmark = function() {
    this._id;
    this._bookmark = {};
    this._bookList = [];
  };

  Bookmark.prototype = {
    constructor: Bookmark,
    setId: setId,
    setBookmark: setBookmark,
    deleteBookmark: deleteBookmark,
    addBookmark: addBookmark,
    getBookmarks: getBookmarks
  };

  return Bookmark;

  function setBookmark(bookmark) {
    this._bookmark = bookmark;
  }

  function setId(id) {
    this._id = id;
  }
  // Define your route depended to the name of your app
  function deleteBookmark() {
    var self = this;
    return $http.get('/apps/tutorial-angularjs/delete/' + self._id).then(function(response) {
      return response;
    });
  }

  // Define your route depended to the name of your app
  function addBookmark() {
    var self = this;
    return $http.post('/apps/tutorial-angularjs/add', self._bookmark).then(function(response) {
      self._bookmark = response.data;
      return response;
    });
  }
  
  // Define your route depended to the name of your app
  function getBookmarks() {
    var self = this;
    return $http.get('/apps/tutorial-angularjs/bookmarks').then(function(response) {
      self._bookList = response.data;
      return response;
    });
  }
}
;angular.module('Bookmarks').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope', '$injector'];

function HomeAngCtrl($scope, $injector) {
	var Bookmark      = $injector.get('Bookmark'); 
	
	var bookmark      = new Bookmark;
	var vm            = this;
	vm.add            = add;
	vm.removeBookmark = removeBookmark;

	activate();

	function activate() {
		bookmark.getBookmarks().then(function() {
			vm.bookmarks = bookmark._bookList;
		});
	}

	function add(bookItem) {
		var defaultForm = {
          title : "",
          link : ""
      	};
		bookmark.setBookmark(bookItem);
		bookmark.addBookmark().then(function() {
			vm.bookmarks.push(bookmark._bookmark);
			vm.bookmark = defaultForm;
      		$scope.form.$setPristine();	
		});
  	}

  	function removeBookmark(index, bookId) {
  		bookmark.setId(bookId);
  		bookmark.deleteBookmark().then(function() {
  			vm.bookmarks.splice(index, 1);
  		});
  	}
}
;
//# sourceMappingURL=app.js.map