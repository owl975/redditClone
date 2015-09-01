var app = angular.module('flapperNews', ['ui.router'])

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
// setting routes
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

    .state('posts', {
    	url: '/posts/{id}',
    	templateUrl: '/posts.html',
    	controller: 'PostsCtrl'
    });
  // redirect if "otherwise"
  $urlRouterProvider.otherwise('home');
}])

// post factory all posts made here.
.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}])

.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
  $scope.posts = posts.posts;

  	// function that pushes post material to the posts array of objects
	$scope.addPost= function(){
		if(!$scope.title || $scope.title === '') { return; }
		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link, 
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'cool post', upvotes: 0},
				{author: 'Bob', body: 'great idea but it sucks', upvotes: 0}
			]
			});
		$scope.title= '';
		$scope.link='';
		
	};

	$scope.incrementUpvotes = function(post) {
		post.upvotes +=1;
	}
}])

// controller for each posts page
.controller('PostsCtrl', ['$scope','$stateParams','posts', function ($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment= function(){
		if(!$scope.body || $scope.body === '') { return; }
		$scope.post.comments.push({
			body: $scope.body, 
			author: 'user', 
			upvotes: 0,
			});
		$scope.body = '';
		;}
}]);




