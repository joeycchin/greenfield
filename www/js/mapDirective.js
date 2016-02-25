angular.module('map.directives', [])
.directive('map', function(userEventsService, $compile, Auth) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  var markers = [];

  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
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
      };

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
      };

      function initialize() {
        userEventsService.getAllEvents()
        .then(function (events) {
          navigator.geolocation.getCurrentPosition(function(position){
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
            $scope.map = new google.maps.Map($element[0], mapOptions);
            var marker;

            for (var i = 0; i < events.length; i++) {
              var latLng = new google.maps.LatLng(events[i].latitude, events[i].longitude);
              addMarker(latLng, events[i]);
            }
          }, function(error){
            console.log("Could not get location");
          });
        });
  
        $scope.onCreate({map: $scope.map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});