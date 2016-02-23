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

    // add functions here to return
    return {
      login: login,
      signup: signup
    };

  });