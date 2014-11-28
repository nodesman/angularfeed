(function(){
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("SubscriptionListController", ["$scope", "$rootScope", "$subscriptionService", function($scope, $rootScope, $subscriptionService) {

    $scope.showDialog = function () {
      $rootScope.$broadcast("showAddNewDialog");
    };

    var $subscriptionsList = [];
    $rootScope.$watch(function () {
      return $rootScope.data;
    }, function() {
      renderSubscriptions();
    });

    var renderSubscriptions = function() {
      $subscriptionsList = $subscriptionService.getSubscriptionsSerialList();
      $subscriptionsList = _.map($subscriptionsList, function(item) {
        item.collapsed = false;
        return item;
      });
      $scope.subscriptions = $subscriptionsList;
    };

    $scope.$on("renderSubscriptions", renderSubscriptions);

    $subscriptionService.onChange(function() {
        $rootScope.$broadcast("refresh");
    });

    $scope.refresh = function() {
      $scope.$emit("refresh");
    };

    $scope.collage = function() {
      $scope.$emit("collage");
    };

    $scope.$on("collapseFolder", function($event, $object) {

      var $startingIndex = null, $endIndex = null, $endState = !$object.collapsed;

      for (var $index =0; $index < $subscriptionsList.length; $index++) {

        if (angular.equals($subscriptionsList[$index], $object)) {
          $startingIndex = $index;
        }

        if (null !== $startingIndex && $index !== $startingIndex) {
          if  (($subscriptionsList[$index].type === 'feed' && $subscriptionsList[$index].child === false) || $subscriptionsList[$index].type === 'folder') {
            $endIndex = $index - 1;
            break;
          }

          if ($index === $subscriptionsList.length - 1) {
            $endIndex = $index;
            break;
          }

        }
      }

      for ($index = $startingIndex; $index <= $endIndex; $index++) {
        $subscriptionsList[$index].collapsed = $endState;
      }
    });
  }]);

})();