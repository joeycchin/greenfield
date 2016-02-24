angular.module('pug.map', [])
.controller('MapController', function($scope, $ionicLoading, $compile, $cordovaGeolocation, Auth) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    
    var loc = Auth.get() || [position.coords.latitude, position.coords.longitude];
    var eventLoc = new google.maps.LatLng(loc[0], loc[1]);

    var mapOptions = {
      center: eventLoc,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
     google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     
      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: eventLoc //
      });      
     
      var infoWindow = new google.maps.InfoWindow({
        content: "Here I am!"
      });
     
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });
    });
  }, function(error){
    console.log("Could not get location");
  });

  $scope.logout = function() {
    Auth.logout();
  };
});