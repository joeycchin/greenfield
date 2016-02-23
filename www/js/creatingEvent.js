angular.module('pug.creatingEvent', [])

  .factory('creatingEventService', function ($http, $location, $window) {
    var addEvent = function (createdEvent) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/events',
        data: createdEvent
      })
      .then(function (data) {
        //option 1) render a event successfully created page
        //option 2) redirect to user's event listing page
        return data;
      })
    }
    return {
      addEvent: addEvent
    }
  })
  .controller('creatingEventCtrl', function (creatingEventService, $scope, $http, $location, $window) {
    $scope.createdEvent = {};

    $scope.addEvent = function () {
      creatingEventService.addEvent($scope.createdEvent)
      .then(function () {
        $location.path('/map');
      })
    }
  })