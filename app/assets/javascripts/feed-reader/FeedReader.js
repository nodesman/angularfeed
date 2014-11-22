(function() {
  var feedReader = angular.module("FeedReader", ["ngRoute"]);

  feedReader.config(function($routeProvider){

    $routeProvider.when("/collage", {
      templateUrl: "/collage",
      controller: "FeedReaderController"
    }).otherwise({
      redirectTo: '/collage'
    });
  })
})();