angular.module('creatingEvent', ['pug.services'])
.controller('creatingEventCtrl', function (Auth, $scope, $http, $location, $window, $state, $ionicHistory) {
  $scope.createdEvent = {};
  $scope.loc = [];
  $scope.showStartTime = false;
  $scope.showEndTime = false;

  $scope.addEvent = function () {
    Auth.addEvent($scope.createdEvent)
    .then(function () {
      Auth.set($scope.createdEvent);
      $ionicHistory.clearCache()
      .then(function (){ 
        $state.go('map', {}, {reload: true})
      }) 
    })
  }

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

  function startTimePickerCallback(val) {
    console.log(val);

    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      var today = new Date();
      var timeZoneDiff = today.getTimezoneOffset() / 60;
      var hour = parseInt(val/3600);
      var minute = (val - hour*3600) / 60;
      today.setUTCHours(hour + timeZoneDiff);
      today.setUTCMinutes(minute);
      today.setUTCSeconds(0);
      $scope.showStartTime = true;
      $scope.createdEvent.startTime = today;
      var space = ' ';
      var displayT = format(today);
      $scope.displayStartTime = space + ' is ' + displayT;
    }
  }

  function endTimePickerCallback(val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      var today = new Date();
      var timeZoneDiff = today.getTimezoneOffset() / 60;
      var hour = parseInt(val/3600);
      var minute = (val - hour*3600) / 60;
      today.setUTCHours(hour + timeZoneDiff);
      today.setUTCMinutes(minute);
      today.setUTCSeconds(0);
      $scope.showEndTime = true;
      $scope.createdEvent.endTime = today;
      var space = ' ';
      var displayT = format(today);
      $scope.displayEndTime = space + ' is ' + displayT;
    }
  }

  $scope.startTime = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    format: 12,
    callback: function (val) {
      startTimePickerCallback(val);
    }
  };

  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    format: 12,
    callback: function (val) {
      endTimePickerCallback(val);
    }
  };
})

