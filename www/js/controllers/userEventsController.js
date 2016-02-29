angular.module('pug.userEventsController', ['pug.userEventsService', 'pug.timeFormatService'])
.controller('userEventsController', function ($scope, userEventsService, $ionicPopup, timeFormatService){
  $scope.userEvents = [];

  userEventsService.getUserEvents()
  .then(function(resp){
  	$scope.userEvents = resp;
  });


 $scope.showConfirm = function(eventId) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Checkout of Event',
     template: 'Are you sure you want to checkout of this event?'
   });


   confirmPopup.then(function(yes) {
     if(yes) {
       userEventsService.removeUserEvent(eventId);
       
      for(var i = 0; i < $scope.userEvents.length; i++){
        if($scope.userEvents[i].data._id === eventId){
       	  $scope.userEvents.splice(i,1);
        }
      }
     }
   });
 };

  $scope.format = timeFormatService.formatTime;

});


