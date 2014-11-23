(function() {

  var feedReader = angular.module("FeedReader");

  feedReader.directive("liveTime", function () {
    return {
      restrict: 'E',
      replace: true,
      link: function($scope, $element, $attributes) {
      },
      template: $("#feed-grouping-template").html()
    };
  });

})();