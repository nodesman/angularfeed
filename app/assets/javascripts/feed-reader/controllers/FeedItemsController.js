(function() {

  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedItemsController", ["$scope", "$location", function ($scope, $location) {

    $scope.$on("renderFeed", function($event, $data) {
      $scope.assortedFeedItems = $data;
    });

    $scope.$on("showItem", function($event, $data) {
      $location.path("/item/" + $data.uuid);
    });

    $scope.$emit("feedListReady");

  }]);

})();