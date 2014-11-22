(function() {
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.factory("$subscriptionService", function() {
    return {
      subscribe: function(url, folderName) {
        console.log("Subscribe to " + url + " inside folder " + folderName);
      },
      getFolderList: function() {
        return ["Blogs", "Pioneers", "Emminent People"];
      }
    };

  });

})();