(function() {

  var feedReader = angular.module("FeedReader");

  feedReader.directive("feedGrouping", function () {
    return {
      restrict: 'E',
      replace: true,
      link: function($scope, $element, $attributes) {

      },
      template: $("#feed-grouping-template").html()
    };
  });

})();