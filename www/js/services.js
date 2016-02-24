angular.module('pug.services', [])

  .factory('Auth', function($http, $location, $window) {
    var login = function(user) {
      return  $http({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/users/signin',
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };

    var signup = function(user) {
      return  $http({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/users/signup',
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };

    var isAuth = function() {
      return !!$window.localStorage.getItem('com.pug');
    };

    var logout = function() {
      $window.localStorage.removeItem('com.pug');
      $location.path('/intro');
    };

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

    // add functions here to return
    return {
      login: login,
      signup: signup,
      isAuth: isAuth,
      logout: logout,
      addEvent: addEvent,
      set: set,
      get: get
    };

  });