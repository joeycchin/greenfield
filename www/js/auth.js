angular.module('pug.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signup = function () {
    Auth.signup($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.pug', token);
      //should redirect to 'map' route once set up
      $location.path('/map');
    })
    .catch(function (error) {
      console.error(error);
    });
  };
});