(function() {
  var feedReader = angular.module("FeedReader", ["ngRoute", "ngSanitize"]);

  feedReader.config(["$routeProvider", function($routeProvider){
    $routeProvider.when("/collage", {
      templateUrl: "/collage",
      controller: "FeedReaderController"
    }).when("/item/:id", {
      templateUrl: "/item",
      controller: "FeedItemController"
    }).otherwise({
        redirectTo: '/collage'
    });
  }]);
})();