angular.module('pug.userEventsService', ['ngRoute'])

.factory('userEventsService', function($http, $location){

  
  // var url = ['http://127.0.0.1:3000/api/users/', userId, '/event'].join();

  var getUserEvents = function(){
  
    return $http({
      method : 'GET',
      url : 'http://127.0.0.1:3000/api/users/:id/events'
    })
    .then(function(resp){
      return resp;
    });
    
  };



  return {
    getUserEvents : getUserEvents
  };
  
});