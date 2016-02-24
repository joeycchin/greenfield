angular.module('pug.userEventsController', ['pug.userEventsService'])
.controller('userEventsController', function($scope, userEventsService){
  $scope.userEvents = [];

  userEventsService.getUserEvents()
  .then(function(resp){
  	$scope.userEvents = resp;
  });

});
