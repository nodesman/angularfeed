(function() {

  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedItemsController", ["$scope", function ($scope) {
    $scope.assortedFeedItems = [{
      date: 1416653451,
      items: [{
        title: "This is a test title",
        body: "This is the test body",
        favicon: "http://www.w3.org/2008/site/images/favicon.ico",
        site: "Site name",
        time: 1416653451,
        uuid: '3242424'
      }]
    }, {
      date: 1416353351,
      items: []
    }];

  }]);

})();