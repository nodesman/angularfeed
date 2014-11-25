(function() {
  "use strict";

  var feedReader = angular.module("FeedReader");
  feedReader.factory("$subscriptionService", ["$window", function($window) {

    var Subscriptions = [];
    var subscriptionItemKey = "angular_feed_data";

    function reloadSubscriptions() {
      Subscriptions = JSON.parse($window.localStorage.getItem(subscriptionItemKey));
    }

    function commitSubscriptions() {
      $window.localStorage.setItem(subscriptionItemKey, JSON.stringify(Subscriptions));
    }

    reloadSubscriptions();

    var subscriptionService = {
      isFirstTime: function() {
        return (null === Subscriptions);
      },
      getSubscriptionsSerialList: function() {
        return [
          {
            type: "folder",
            name: "Blogs"
          },
          {
            name: "A List Apart",
            type: "feed",
            favicon: "http://alistapart.com/d/_repo/site_assets/img/favicons/favicon.ico",
            url: "http://feeds.feedburner.com/alistapart/main",
            child: true
          },
          {
            name: "W3C Blog",
            type: "feed",
            favicon: "http://www.w3.org/2008/site/images/favicon.ico",
            url: "http://www.w3.org/blog/feed/",
            child: true
          },
          {
            name: "ChrisG",
            type: "feed",
            favicon: "http://www.chrisg.com/wp-content/themes/chrisg-genesis/images/favicon.ico",
            url: "http://feeds.feedburner.com/chrisgcom",
            child: false
          }];
      },
      getSubscriptionsRaw: function () {
        return $window.localStorage.getItem(subscriptionItemKey);
      },
      doesSubscriptionExist: function(url) {
        if (Subscriptions.length > 0)
          for (var iter=0; iter < Subscriptions.length; iter++) {
            if (undefined !== Subscriptions[iter].type && Subscriptions[iter].type === "folder") {
              var currentFeedList = Subscriptions[iter].items;
              for (var subiter=0; subiter < currentFeedList.length; subiter++) {
                if (currentFeedList[subiter] === url) {
                  return true;
                }
              }
              continue;
            }

            if (Subscriptions[iter] === url) {
              return true;
            }
          }
        return false;
      },
      subscribe: function(url, folderName) {

        if (this.doesSubscriptionExist(url)) {
          //TODO: Show an error message to the user.
          return;
        }

        if (null !== folderName) { //filing the subscription under a folder.
          var folder = _.find(Subscriptions, function (item) {
            if (item.type === 'folder') {
              return item.name;
            }
            return null;
          }, folderName);

          if (undefined === folder) {
            var newFolder = {
              name: folderName,
              type: 'folder',
              items: [url]
            };
            Subscriptions.push(newFolder);
          } else {
            folder.items.push(url);
          }
        }
        else {
          Subscriptions.push(url);
        }

        commitSubscriptions();
        reloadSubscriptions();
      },
      getFolderList: function() {
        var folderNames = [];
        if (Subscriptions.length > 0)
          for (var iter=0; iter < Subscriptions.length; iter++) {
            if (Subscriptions[iter].type === 'folder') {
              folderNames.push(Subscriptions[iter].name);
            }
          }
        return folderNames;
      }
    };
    return subscriptionService;
  }]);

  function extractDataForSubscriptionService(data) {
    return dataForSubscriptionService;
  }

})();