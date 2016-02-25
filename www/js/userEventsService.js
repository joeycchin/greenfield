angular.module('pug.userEventsService', [])

.factory('userEventsService', function($http, $location){
 
  var getEvent = function(eventId){
    return $http({
      method : 'GET',
      url : 'http://127.0.0.1:3000/api/events/' +eventId
    });
  };
  
  var getUserEvents = function(){
    return $http({
      method : 'GET',
      url : 'http://127.0.0.1:3000/api/users/1/event'
    })
    .then(function(resp){
      var eventIds = resp.data;
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
 
  var removeUserEvent = function(eventId){
    return $http({
      method : 'DELETE',
      url : 'http://127.0.0.1:3000/api/events/users/1',
      data : {eventId : eventId},
      headers: {"Content-Type": "application/json;charset=utf-8"}
    });
  };

  return {
    getUserEvents : getUserEvents,
    getAllEvents: getAllEvents,
    getEvent : getEvent,
    removeUserEvent : removeUserEvent
  };
});
