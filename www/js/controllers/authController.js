angular.module('pug.auth', [])
.controller('AuthController', function ($scope, $window, AuthService, $state, $ionicPopup) {
  $scope.user = {};

  $scope.login = function () {
    AuthService.login($scope.user)
    .then(function (token) {
      // Attach authentication token
      $window.localStorage.setItem('com.pug', token);
      // Reset scope variables and redirect to map after submitting form
      $scope.user = {};
      $state.go('tabs.map', {}, {reload: true});
    })
    .catch(function (error) {
      console.error(error);

      var errMsg = 'Incorrect password or email';
      $scope.showAlert(errMsg);
    });
  };

  $scope.signup = function () {
    AuthService.signup($scope.user)
    .then(function (token) {
      // Attach authentication token
      $window.localStorage.setItem('com.pug', token);
      // Reset scope variables and redirect to map after submitting form
      $scope.user = {};
      $state.go('tabs.map', {}, {reload: true});
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

  $scope.logout = function() {
    AuthService.logout();
  };
});
