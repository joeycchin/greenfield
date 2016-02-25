angular.module('pug.map', ['map.directives'])
.controller('MapController', function ($scope, Auth) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.logout = function() {
    Auth.logout();
  };
});

