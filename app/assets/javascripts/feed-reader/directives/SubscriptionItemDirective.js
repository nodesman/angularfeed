(function() {
  var feedReader = angular.module("FeedReader");
  feedReader.directive("subscriptionItem", function () {
    return {
      restrict: "EAC",
      replace: true,
      template: $("#subscribed-item").html(),
      link: function($scope, element, attributes) {
        $scope.collapse = function () {
          $scope.$emit("collapseFolder", $scope.subscription);
        }
        $scope.show = function() {
          $scope.$emit("renderItem", $scope.subscription);
        }
      }
    };
  });

})();