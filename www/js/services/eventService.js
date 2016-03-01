angular.module('pug.eventService', [])

.factory('EventService', function($http, $location, $window) {
  
  var eventLatLng;

  var addEvent = function (createdEvent) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/events',
      data: createdEvent
    });
  };

  var set = function (createdEvent) {
    eventLatLng = {
      lat: createdEvent.latitude,
      lng: createdEvent.longitude
    };
  };

  var setEmpty = function () {
    eventLatLng = undefined;
  };

  var get = function () {
    return eventLatLng;
  };

  return {
    addEvent: addEvent,
    set: set,
    get: get,
    setEmpty: setEmpty
  };

});