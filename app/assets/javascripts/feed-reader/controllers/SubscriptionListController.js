(function(){
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("SubscriptionListController", ["$scope", "$rootScope", function($scope, $rootScope) {
    $scope.showDialog = function () {
      $rootScope.$broadcast("showAddNewDialog");
    };

  }]);

})();