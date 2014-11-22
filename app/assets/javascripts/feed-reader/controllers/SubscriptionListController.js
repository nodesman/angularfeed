(function(){
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("SubscriptionListController", ["$scope", "$rootScope", "$subscriptionService", function($scope, $rootScope, $subscriptionService) {
    $scope.showDialog = function () {
      $rootScope.$broadcast("showAddNewDialog");
    };
    $scope.subscriptions = $subscriptionService.getSubscriptionsSerialList();
  }]);

})();