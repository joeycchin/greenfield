angular.module('pug.auth', [])
.controller('AuthController', function ($scope, $window, $location, Auth, $state, $ionicPopup) {
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.pug', token);
      //should redirect to 'map' route once set up
      $state.go('map');
    })
    .catch(function (error) {
      console.error(error);

      var errMsg = 'Incorrect password or email';
      $scope.showAlert(errMsg);
    });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.pug', token);
      //should redirect to 'map' route once set up
      $state.go('map');
    })
    .catch(function (error) {
      console.error(error);

      var errMsg = 'Sorry about that. It looks like we already have the entered email on our records.';
      $scope.showAlert(errMsg);
    });
  };

  $scope.showAlert = function(errMsg) {
    var alertPopup = $ionicPopup.alert({
      template: errMsg
    });
  };
});
