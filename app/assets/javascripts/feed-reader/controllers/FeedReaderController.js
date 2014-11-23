(function() {

  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedReaderController", ["$scope", "$rootScope", function ($scope, $rootScope) {

    $scope.$on("renderItem", function($event, $item) {
        //TODO: Implement render item
      console.log("Render at FR" + JSON.stringify($item));
    });

    $scope.$on("collage", function() {
      //TODO: Implement consolidated list of feed items
    });

    $scope.$on("showItem", function($event, $item) {
      //TODO: Implement the viewing of the individual post in the full screen panel
    });

    //get the feed items and set it on the root scope


  }]);
})();