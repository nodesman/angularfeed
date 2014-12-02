(function() {

  angular.module("FeedReader").controller("FirstTimeController", ["$scope", function($scope) {

    $scope.$on("showFirstTime", function($event) {
      $scope.firstTimeVisible = true;
    });

    $scope.close = function() {
      $scope.firstTimeVisible = false;
    };
  }]);
})();