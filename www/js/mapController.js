angular.module('pug.map', [])
.controller('MapController', function($scope, $ionicLoading, $compile, $cordovaGeolocation, Auth, userEventsService) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  var markers = [];
  $scope.events;

  userEventsService.getAllEvents()
  .then(function (events) {
    $scope.events = events;

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var loc = Auth.get() || [position.coords.latitude, position.coords.longitude];
      var centerLatLng = new google.maps.LatLng(loc[0], loc[1]);

      var mapOptions = {
        center: centerLatLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false
      };

      // Create new map with mapOptions specified
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker;

      for (var i = 0; i < $scope.events.length; i++) {
        var latLng = new google.maps.LatLng($scope.events[i].latitude, $scope.events[i].longitude);
        addMarker(latLng, $scope.events[i]);
      }
    }, function(error){
      console.log("Could not get location");
    });
  });

  // Adds a marker to the map and push to the array.
  function addMarker(latLng, event) {
    var infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    marker.eventType = event.type;

    // Sets text that popups when marker is clicked
    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infoWindow.setContent(event.type);
          infoWindow.open($scope.map, marker);
        };
    })(marker));

    markers.push(marker);
  }

  $scope.filterEvents = function () {
    for (var i = 0; i < markers.length; i++) {
      if(!markers[i].eventType.includes($scope.filter)) {
        markers[i].setMap(null);
      } else if (markers[i].eventType.includes($scope.filter) || $scope.filter === '') {
        if (markers[i].map === null) {
          markers[i].setMap($scope.map);
        }
      }
    }
  }

  $scope.logout = function() {
    Auth.logout();
  };
});

