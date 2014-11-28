(function() {

  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedItemsController", ["$scope", "$rootScope", "$location", function ($scope, $rootScope, $location) {

    $scope.$on("renderFeed", function($event, $data) {
      renderFeed($data);
    });

    function renderFeed($data) {
      $scope.assortedFeedItems = $data;
      $rootScope.$broadcast("hideLoading");
    }

    $scope.$watch(function() {
      return $scope.data
    }, function ($newValue) {
      if ($newValue !== undefined)
        renderFeed($scope.getAllGrouped());
    });

    $scope.$on("showItem", function($event, $data) {
      $location.path("/item/" + $data.uuid);
    });

    $scope.$emit("feedListReady");

  }]);

})();