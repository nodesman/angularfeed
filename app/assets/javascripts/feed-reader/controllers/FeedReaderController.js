(function() {

  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.controller("FeedReaderController", ["$scope", "$rootScope", "$subscriptionService", "$http", function ($scope, $rootScope, $subscriptionService, $http) {

    $scope.networkError = false;

    if (undefined === $rootScope.firstTime)
      $rootScope.firstTime = false;

    $scope.$on("renderItem", function($event, $item) {
      var posts = [];
      if ($item.type === "folder") {
        var relevantFolder = _.find($scope.data, function(item) {
          return item.name === $item.name;
        });

        _.map(relevantFolder.items, function(item) {
          posts = posts.concat(item.items);
        });
      }
      else {
        var relevantSub = null;

        _.map($scope.data, function(item) {

          if (item.type === "folder") {
            _.map(item.items, function(item) {
              if (item.url === $item.url) {
                relevantSub = item;
              }
            });
          }
          else {
            if (item.url === $item.url)
              relevantSub = item;
          }
        });
        posts = relevantSub.items;
      }
      var groupedList = groupPostsByDate(posts);
      $scope.$broadcast("renderFeed", groupedList);
    });

    function groupPostsByDate(posts) {

      function datesInPosts() {
        var dates = _.map(posts, function(item) {
          return (new Date(item.date * 1000)).setHours(0, 0, 0, 0) / 1000;
        });
        var unique_dates = _.uniq(dates);
        return unique_dates;
      }

      var dates = datesInPosts();
      var groups = [];
      for (var iter = 0; iter < dates.length; iter++) {

        var current = {
          date: dates[iter],
          items: []
        };

        current.items = _.filter(posts, function(item) {
          var currentdate = new Date(current.date * 1000);
          var itemdatewithouthours = new Date(item.date * 1000).setHours(0, 0, 0, 0);
          return (currentdate.getTime() === itemdatewithouthours)
        });
        groups.push(current);
      }

      groups = _(_.sortBy(groups, function(item) {
        return item.date;
      })).reverse().value();
      return groups;
    }

    $scope.$on("collage", function() {
      $rootScope.$broadcast("renderFeed", getAllGrouped());
    });

    function getAllPostsAvailable() {
      var combined = [];
      var baseData = $scope.data;
      for (var iter = 0; iter < baseData.length; iter++) {
        var current = baseData[iter];
        if ("folder" === current.type) {
          for (var j = 0; j < current.items.length; j++) {
            combined = combined.concat(current.items[j].items);
          }
        }
        else {
          combined = combined.concat(current.items);
        }
      }
      return combined;
    }

    $scope.getAllGrouped = function () {
      var combined = getAllPostsAvailable();
      var posts = groupPostsByDate(combined);
      return posts;
    };

    function getSubscriptionInfo() {
      var subscriptions = _.map($scope.data, function(item) {
        var currentitem = null;
        if (item.type === "folder") {
          currentitem = _.clone(item, true);
          currentitem.items = _.map(item.items, function(item) {
            var current = _.clone(item, true);
            current.count = current.items.length;
            delete current.items;
            return current;
          });
          return currentitem;
        } else {
          currentitem  = _.clone(item, true);
          currentitem.count = currentitem.items.length;
          delete currentitem.items;
          return currentitem;
        }
      });
      return subscriptions;
    }

    $rootScope.getPost = function($id) {

      $id = parseInt($id);
      var posts = getAllPostsAvailable();
      var post = _.find(posts, function(item) {
        return item.uuid === $id
      });
      return post;
    };

    function renderFeedData() {
      $rootScope.$broadcast("renderFeed", $scope.getAllGrouped());
      $subscriptionService.setProcessedSubscriptions(getSubscriptionInfo());
      $rootScope.$broadcast("renderSubscriptions");
    }

    var refreshFeeds = function () {
      $scope.$broadcast("showLoading");
      var subscriptionInfo = $subscriptionService.getSubscriptionsRaw();
      var $responsePromise = $http.post("/fetch", {data: subscriptionInfo});

      $responsePromise.success(function (data) {
        $rootScope.data = data;
        renderFeedData();
      });
    };
    $scope.$on("refresh", refreshFeeds);

    $subscriptionService.onChange(function() {
      $rootScope.$broadcast("refresh");
    });

    if ($rootScope.data === undefined)
      refreshFeeds();

  }]);
})();