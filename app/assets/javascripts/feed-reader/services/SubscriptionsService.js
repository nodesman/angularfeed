(function() {
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.factory("$subscriptionService", function() {
    return {
      getSubscriptionsSerialList: function() {
        return [{
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
      subscribe: function(url, folderName) {
        
      },
      getFolderList: function() {
        return ["Blogs", "Pioneers", "Emminent People"];
      }
    };

  });

})();