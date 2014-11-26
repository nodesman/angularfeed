(function() {
  "use strict";

  var feedReader = angular.module("FeedReader");
  feedReader.controller("LoadingController", ["$scope", "$rootScope", function ($scope, $rootScope) {

    $scope.visible = true;

    $scope.$on("hideLoading", function() {
      $scope.visible = false;
    });

    $scope.$on("showLoading", function() {
      $scope.visible = true;
    });

    //get the feed items and set it on the root scope
  }]);
})();