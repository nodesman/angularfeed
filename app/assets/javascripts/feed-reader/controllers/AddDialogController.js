(function() {
  "use strict";

  var feedReader = angular.module("FeedReader");
  feedReader.controller("AddDialogController", ["$scope", "$element", "$subscriptionService", "$dialogService", function ($scope, $element, $subscriptionService, $dialogService) {

    var FOLDER_SELECTION_NONLITERALS = {
      NEW_FOLDER: "new-folder",
      NO_FOLDER: "no-folder"
    };

    function setInitialState() {
      $scope.url = null;
      $scope.dialogVisible = false;
      $scope.newFolderName = "";
      $scope.currentFolderSelectionValue = FOLDER_SELECTION_NONLITERALS.NO_FOLDER;
      $scope.isNewFolder = false;
      $scope.folderNameFocus = false;
      $scope.isValidFoldername = false;
      $scope.subscribeDisabled = false;
      $scope.folderList = ["Blogs", "Important Companies", "Important Frameworks"];
    }

    function assignSubscribeButtonEnabledState(newValue) {
      if (true === $scope.isNewFolder) {
        $scope.subscribeDisabled = (0 === newValue.length);
      } else {
        $scope.subscribeDisabled = false;
      }
      $scope.folderList = $subscriptionService.getFolderList();
    }

    $scope.$on("showAddNewDialog", function () {
      $scope.open();
    });



    $scope.$watch(function () {
      return $scope.newFolderName
    }, function (newValue) {
      $scope.isValidFolderName = (0 < newValue.length);
    });

    $scope.$watch(function () {
      return $scope.newFolderName;
    }, function (newValue) {
      assignSubscribeButtonEnabledState(newValue);
    });

    $scope.$watch(function () {
      return $scope.isNewFolder;
    }, function (newValue) {
      assignSubscribeButtonEnabledState($scope.newFolderName)
    });

    $scope.$watch(function () {
      return $scope.currentFolderSelectionValue;
    }, function (newValue) {
      $scope.isNewFolder = (newValue === FOLDER_SELECTION_NONLITERALS.NEW_FOLDER);
    });

    $scope.addSubscription = function () {
      //do some stuff
      $scope.close();
    };

    $scope.close = function () {
      $dialogService.hide($element);
    };

    $scope.cancel = function() {
      $scope.close();
    };

    $scope.open = function() {
      setInitialState();
      $dialogService.show($element);
    };
    setInitialState();
    $dialogService.init($element);

  }]);
})();