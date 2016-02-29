angular.module('pug.map', [])
.controller('MapController', function($scope, $ionicLoading, $compile, $cordovaGeolocation, Auth, userEventsService, $ionicPopup) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  var markers = [];
  $scope.events;

  var createMap = function(callback) {
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
      callback();

    }, function(error){
      console.log("Could not get location");
    });
  };

  var updateMap = function() {
    userEventsService.getAllEvents()
    .then(function (events) {
      $scope.events = events;

    var marker;

    for (var i = 0; i < $scope.events.length; i++) {
      var latLng = new google.maps.LatLng($scope.events[i].latitude, $scope.events[i].longitude);
      addMarker(latLng, $scope.events[i]);
    }

    });
  };

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
  
          var formattedDateTime = format(event.startTime);
          var plural = (event.playerCount > 1) ? "players" : "player";
          
          var eventTypeArr = ["<div class='important'>", event.type ,"</div>"].join('');
          var playerCountArr = ["<div class='important'>", event.playerCount, " " , plural, "</div>"].join('');
          var eventStartTimeArr = ["<div class='notImportant'>", formattedDateTime ,"</div>"].join('');
          var locationArr = ["<div class='notImportant'>", event.location ,"</div>"].join('');
          var skillLevelArr = ["<div class='notImportant'>", event.skillLevel ,"</div>"].join('');
          var allInfoArr;

          // Find events for current user
          userEventsService.getUserEventIds()
          .then(function(eventIds) {
            var eventId = event._id;

            // If user not checked into event
            if (!eventIds.includes(eventId)) {

              var addEvent = ['<span id='+ event._id + '>Add Event</span>'].join('');
              allInfoArr = [eventTypeArr, playerCountArr, eventStartTimeArr, locationArr, skillLevelArr, addEvent].join('');
              infoWindow.setContent("<div class='container'>" + allInfoArr + "</div>");
              infoWindow.open($scope.map, marker);

              var contentBox = document.getElementById(event._id);
              contentBox.addEventListener("click", function() {

                // Check in user and return popup when complete
                userEventsService.getUserEventIds()
                .then(function(eventIds) {
                  var eventId = event._id;

                  if (!eventIds.includes(eventId)) {
                    userEventsService.checkInUser(eventId)
                    .then(function() {
                      $ionicPopup.alert({
                        title: 'Event added!'
                      });
                      // Close marker content box
                      infoWindow.close();
                      
                      // Update map
                      updateMap();
                    });  

                  // Popup displays if user tries to check into event more than once
                  } else {
                    $ionicPopup.alert({
                      title: 'Event already added!'
                    });
                  }

                });

              }, false);

            // If user is already checked into event
            } else {

              var checkedIn = ['<span id='+ event._id + '>Checked in!</span>'].join('');
              allInfoArr = [eventTypeArr, playerCountArr, eventStartTimeArr, locationArr, skillLevelArr, checkedIn].join('');
              infoWindow.setContent("<div class='container'>" + allInfoArr + "</div>");
              infoWindow.open($scope.map, marker);
            }

          });

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
  };

  // Initialize map
  createMap(function() {
    updateMap();
  });
});


function format(startTime){
  var start = new Date(startTime);
  var date = start.toString().split(' ').slice(0,3);
  var time = start.toString().split(' ')[4];
  var formattedTime = time.split(':');
  var hours = Number(formattedTime[0]);
  var minutes = formattedTime[1];
  var append;

  if(hours > 12){
    hours-=12;
    append = 'PM';
  } else {
    append = 'AM';
  }

  formattedTime = [hours, minutes].join(':') + ' ' + append;
  date.push(formattedTime);

  return date.join(' ');  
};










