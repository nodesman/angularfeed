(function() {
  "use strict";
  var feedReader = angular.module("FeedReader");
  feedReader.factory("$dialogService", function() {
    //TODO: Do what is necessary to register and insert jQuery.
    return {
      init: function($element) {
         jQuery($element).dialog({
           autoOpen: false,
           create: function() {
             jQuery($element).dialog({
               show: {
                 effect: "drop",
                 duration: 400,
                 direction: "up"
               },
               hide: {
                 effect: "drop",
                 duration: 400,
                 direction: "up"
               }
             });
           }
         });
      },
      show: function($element) {
        jQuery($element).dialog("open");
      },
      hide: function($element) {
        jQuery($element).dialog("close");
      }
    };

  });

})();