(function(){
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("SubscriptionListController", ["$scope", "$rootScope", "$subscriptionService", function($scope, $rootScope, $subscriptionService) {

    $scope.showDialog = function () {
      $rootScope.$broadcast("showAddNewDialog");
    };
    var $subscriptionsList = $subscriptionService.getSubscriptionsSerialList();
    for (var $index in $subscriptionsList) {
      $subscriptionsList[$index].collapsed = false;
    }

    $scope.subscriptions = $subscriptionsList;


    $scope.collage = function() {
      //show all feed items
      $scope.$emit("collage");
    };

    $scope.$on("collapseFolder", function($event, $object) {
      var $startingIndex = null, $endIndex = null;
      var $endState = !$object.collapsed;
      for (var $index in $subscriptionsList) {

        if (angular.equals($subscriptionsList[$index], $object)) {
          $startingIndex = $index;
        }

        if (null !== $startingIndex && (($subscriptionsList[$index].type === 'feed' && $subscriptionsList[$index].child === false) || $subscriptionsList.type === 'folder')) {
          $endIndex = $index - 1;
          break;
        }
      }

      for ($index = $startingIndex; $index <= $endIndex; $index++) {
        $subscriptionsList[$index].collapsed = $endState;
      }
    });

  }]);

})();