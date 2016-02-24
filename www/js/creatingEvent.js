angular.module('pug.creatingEvent', ['pug.services'])
  .controller('creatingEventCtrl', function (Auth, $scope, $http, $location, $window) {
    $scope.createdEvent = {};

    $scope.addEvent = function () {
      Auth.addEvent($scope.createdEvent)
      .then(function () {
        //will not redirect to map view, waiting on user token information
        $location.path('/map');
      })
    }

    $scope.loc = [];

    $scope.searchAddress = function () {

      var addressInput = $scope.createdEvent.location;
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({address: addressInput}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          $scope.createdEvent.latitude=results[0].geometry.location.lat();
          $scope.createdEvent.longitude=results[0].geometry.location.lng();
          $scope.addEvent();

        }
      });

    }


  })