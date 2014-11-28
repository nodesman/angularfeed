(function() {
  "use strict";

  var feedReader = angular.module("FeedReader");
  feedReader.controller("LoadingController", ["$scope", "$rootScope", function ($scope, $rootScope) {

    $scope.$on("hideLoading", function() {
      $scope.loadingVisible = false;
    });

    $scope.$on("showLoading", function() {
      $scope.loadingVisible = true;
    });

    //get the feed items and set it on the root scope
  }]);
})();