(function() {
  "use strict";

  var feedReader = angular.module("FeedReader");
  feedReader.controller("AddDialogController", ["$scope", "$rootScope", "$element", "$subscriptionService", "$dialogService", function ($scope, $rootScope, $element, $subscriptionService, $dialogService) {

    function setInitialState() {
      $scope.url = null;
      $scope.dialogVisible = false;
      $scope.newFolderName = "";
      $scope.currentFolderSelectionValue = FOLDER_SELECTION_NONLITERALS.NO_FOLDER;
      $scope.isNewFolder = false;
      $scope.folderNameFocus = false;
      $scope.isValidFoldername = false;
      $scope.isValidUrl = false;
      $scope.isValidFormState = false;
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

    $scope.$watch(function() {
      return $scope.url;
    }, function(newValue) {
      $scope.isValidUrl = (false !== !!newValue && newValue.length > 0)
    });

    $scope.$watch(function() {
      var $validFolderName = true;
      if ($scope.isNewFolder === true) {
        $validFolderName = ($scope.newFolderName.length !== 0);
      }
      return $scope.isValidUrl && $validFolderName;
    }, function (newValue) {
      $scope.isValidFormState = newValue;
    });

    $scope.$watch(function () {
      return $scope.currentFolderSelectionValue;
    }, function (newValue) {
      $scope.isNewFolder = (newValue === FOLDER_SELECTION_NONLITERALS.NEW_FOLDER);
    });

    $scope.addSubscription = function () {
      var $folderName = $scope.currentFolderSelectionValue;
      if ($scope.isNewFolder) {
        $folderName = $scope.newFolderName;
      }

      if ($folderName === FOLDER_SELECTION_NONLITERALS.NO_FOLDER) {
        $folderName = null;
      }
      $subscriptionService.subscribe($scope.url, $folderName);
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