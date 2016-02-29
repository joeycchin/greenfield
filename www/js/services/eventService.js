angular.module('pug.eventService', [])
.factory('EventService', function($http, $location, $window) {
  var addEvent = function (createdEvent) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/events',
      data: createdEvent
    })
  }

  var eventLatLng;

  var set = function (createdEvent) {
    eventLatLng = [createdEvent.latitude, createdEvent.longitude];
  }

  var get = function () {
    return eventLatLng;
  }

  return {
    addEvent: addEvent,
    set: set,
    get: get
  }
});