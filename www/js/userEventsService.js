angular.module('pug.userEventsService', [])

.factory('userEventsService', function($http, $location){
 
  var getEvent = function(eventId){
    return $http({
      method : 'GET',
      url : 'http://127.0.0.1:3000/api/events/' +eventId
    });
  };

  var getUserEventIds = function() {
    return $http({
      method : 'GET',
      url : 'http://127.0.0.1:3000/api/users/1/event'
    })
    .then(function(resp) {
      return resp.data;
    });
  };
  
  var getUserEvents = function(){
    return getUserEventIds()
    .then(function(resp){
      var eventIds = resp;
      var events = [];

      for(var i = 0; i < eventIds.length; i++){

        getEvent(eventIds[i])
        .then(function(resp){
          events.push(resp); 
        })
        .catch(function(err){
          console.error(err);
        });
      }
      return events;
    });
  };

  var getAllEvents = function() {
    return $http({
      method : 'GET',
      url : 'http://127.0.0.1:3000/api/events'
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var checkInUser = function(eventId) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/events/users/1',
      data : {eventId : eventId}
    });
  };
 
  var removeUserEvent = function(eventId){
    return $http({
      method : 'DELETE',
      url : 'http://127.0.0.1:3000/api/events/users/1',
      data : {eventId : eventId},
      headers: {"Content-Type": "application/json;charset=utf-8"}
    });
  };

  return {
    getUserEventIds: getUserEventIds,
    getUserEvents : getUserEvents,
    getAllEvents: getAllEvents,
    getEvent : getEvent,
    checkInUser: checkInUser,
    removeUserEvent : removeUserEvent
  };
});
