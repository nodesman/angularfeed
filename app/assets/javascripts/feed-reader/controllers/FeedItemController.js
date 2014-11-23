(function(){
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedItemController", ["$scope","$rootScope", "$routeParams","$window", "$location", function($scope, $rootScope, $routeParams,$window, $location) {

    /*
    * {
    *    url: "actual URL"
    *    title: "post title"
    *    site: "name of website"
    *    body: "body of post"
    *    author: "name of author"
    * }
    *
    */


    $scope.showPage = function() {
      $window.open($scope.post.url);
    }

    $scope.back = function() {
      $location.path("/collage");
    }

    if (!$rootScope.getPost) {
      $location.path("/collage");
      return;
    }
    var $post = $rootScope.getPost($routeParams.id);





    $scope.post = $post;

    $scope.visitPost = function() {
      $window.open($scope.post.url);
    }

  }]);
})();