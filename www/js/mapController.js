angular.module('pug.map', [])

.controller('MapController', function($scope, $ionicLoading, $compile, Auth) {
  $scope.init = function() {  
    var mapOptions = {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });

    //Marker + infowindow + angularjs compiled ng-click
    // var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    // var compiled = $compile(contentString)($scope);

    // var infowindow = new google.maps.InfoWindow({
    //   content: compiled[0]
    // });

    // var marker = new google.maps.Marker({
    //   position: myLatlng,
    //   map: map,
    //   title: 'Uluru (Ayers Rock)'
    // });

    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.open(map,marker);
    // });

    $scope.map = map;
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click');
  };

  $scope.logout = function() {
    Auth.logout();
  };

});