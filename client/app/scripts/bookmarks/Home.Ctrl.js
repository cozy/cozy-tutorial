angular.module('Bookmarks').controller('HomeAngCtrl', HomeAngCtrl);

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