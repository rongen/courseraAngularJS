(function () {
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheck);
  LunchCheck.$inject = ['$scope'];
  
  function LunchCheck($scope) {
    $scope.input = "";
    var numberOfItems = 0;
    
    $scope.check = function () {
      $scope.input = $scope.input.trim();
      if($scope.input == "")
       {$scope.message = "Please enter data first";}
     else{
      for (var i = 0; i < $scope.input.length; i++) {
        if($scope.input.charCodeAt(i) == 44){
          numberOfItems += 1;
          console.log(numberOfItems);
        };
      };
      if(numberOfItems < 3)
        {$scope.message = "Enjoy!";}
      else 
        {$scope.message = "Too much!";
      console.log($scope.message);}

      console.log($scope.message);
      numberOfItems = 0;
    };


    console.log($scope.input);
  }}

})();
