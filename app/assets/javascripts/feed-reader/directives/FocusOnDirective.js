(function(){
  var feedReader = angular.module("FeedReader");
  feedReader.directive('focusOn', function() {
    return function(scope, elem, attr) {
      scope.$watch(function() {
        return scope[attr.focusOn] === true;
      }, function(newValue) {
        (true === newValue) ? elem[0].focus() : elem[0].blur();
      });
    };
  });
})();