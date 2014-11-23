(function() {

  var feedReader = angular.module("FeedReader");

  feedReader.directive("feedItem", function () {
    return {
      restrict: 'E',
      replace: true,
      link: function($scope, $element, $attributes) {

        $scope.showItem = function() {
          $scope.$emit("showItem", $scope.item);
        }

      },
      template: $("#feed-item-template").html()
    };
  });

})();