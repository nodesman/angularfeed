(function() {

  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedReaderController", ["$scope", function ($scope) {

    $scope.$on("renderItem", function($event, $item) {
        //TODO: Implement render item
      console.log("Render at FR" + JSON.stringify($item));
    })

    $scope.$on("collage", function() {
      //TODO: Implement consolidated list of feed items
    })
  }]);
})();