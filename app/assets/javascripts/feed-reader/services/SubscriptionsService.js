(function() {
  "use strict";

  var feedReader = angular.module("FeedReader");

  function isInvalid(arg) {
    return false !== !!arg && arg.constructor === Array && arg.length !== 0;
  }

  feedReader.factory("$subscriptionService", ["$window", function($window) {
    var StoredSubscriptions = [];
    var ProcessedSubscriptions = [];

    var onChangeCallbacks = [];

    function reloadSubscriptions() {
      StoredSubscriptions = JSON.parse($window.localStorage.getItem("angular_feed_data"));
      if (isInvalid(StoredSubscriptions)) {
        StoredSubscriptions = [];
        commitSubscriptions();
      }
    }

    function commitSubscriptions() {
      $window.localStorage.setItem("angular_feed_data", JSON.stringify(StoredSubscriptions));
    }

    reloadSubscriptions();

    function notifyChange() {
      for (var iter in onChangeCallbacks) {
        onChangeCallbacks[iter]();
      }
    }


    var subscriptionService = {
      onChange: function(callback) {
        onChangeCallbacks.push(callback);
      },

      isFirstTime: function() {
        return (isInvalid(StoredSubscriptions));
      },

      setProcessedSubscriptions: function(processed) {
        ProcessedSubscriptions = processed;
      },

      getSubscriptionsSerialList: function() {
        var fullList = [];
        _.map(ProcessedSubscriptions, function(item) {
          if (item.type === 'feed') {
            var current = _.clone(item);
            current.child = false;
            fullList.push(current);
          } else {
            var folder = _.clone(item);
            delete folder.items;
            fullList.push(folder);
            _.map(item.items, function(item) {
              var current = _.clone(item);
              current.child = true;
              fullList.push(current);
            });
          }
        });

        return fullList;
      },

      getSubscriptionsRaw: function () {
        return $window.localStorage.getItem("angular_feed_data");
      },

      doesSubscriptionExist: function(url) {
        if (null !== StoredSubscriptions && StoredSubscriptions.length > 0)
          for (var iter=0; iter < StoredSubscriptions.length; iter++) {
            if (undefined !== StoredSubscriptions[iter].type && StoredSubscriptions[iter].type === "folder") {
              var currentFeedList = StoredSubscriptions[iter].items;
              for (var subiter=0; subiter < currentFeedList.length; subiter++) {
                if (currentFeedList[subiter] === url) {
                  return true;
                }
              }
              continue;
            }

            if (StoredSubscriptions[iter] === url) {
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
          var folder = _.find(StoredSubscriptions, function (item) {
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
            StoredSubscriptions.push(newFolder);
          } else {
            folder.items.push(url);
          }
        }
        else {
          StoredSubscriptions.push(url);
        }

        commitSubscriptions();
        reloadSubscriptions();
        notifyChange();
      },

      getFolderList: function() {
        var folderNames = [];
        if (null !== StoredSubscriptions && StoredSubscriptions.length > 0)
          for (var iter=0; iter < StoredSubscriptions.length; iter++) {
            if (StoredSubscriptions[iter].type === 'folder') {
              folderNames.push(StoredSubscriptions[iter].name);
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