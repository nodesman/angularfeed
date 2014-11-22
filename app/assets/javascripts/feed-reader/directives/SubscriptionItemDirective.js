(function() {
  var feedReader = angular.module("FeedReader");
  feedReader.directive("subscriptionItem", function () {
    return {
      restrict: "EAC",
      replace: true,
      template: $("#subscribed-item").html()
    };
  });

})();