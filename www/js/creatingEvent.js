angular.module('pug.creatingEvent', ['pug.services'])
  .controller('creatingEventCtrl', function (Auth, $scope, $http, $location, $window) {
    $scope.createdEvent = {};

    $scope.addEvent = function () {
      Auth.addEvent($scope.createdEvent)
      .then(function () {
        $location.path('/map');
      })
    }
  })