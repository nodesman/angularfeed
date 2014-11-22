(function() {
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.factory("$subscriptionService", function() {
    return {
      subscribe: function(url, folderName) {
        
      },
      getFolderList: function() {
        return ["Blogs", "Pioneers", "Emminent People"];
      }
    };

  });

})();