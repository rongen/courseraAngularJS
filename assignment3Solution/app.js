(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        flag: '<',
        onRemove: '&',
        found: '<',
        message: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrow',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
  var narrow = this;
  // narrow.flag = false;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.searchTerm = "";
  narrow.message = "Nothing found";
  
  // var service = MenuSearchService.getItems();
  narrow.getMatchedMenuItems = function (searchTerm) {
    narrow.flag = false;
    narrow.found =[];
    if(narrow.searchTerm == ""){
      narrow.flag = true;
      console.log("no search term");
    }
    else{
      var promise = MenuSearchService.getMatchedMenuItems();

      promise.then(function (response) {
        narrow.items = response.data.menu_items;
        for (var i = narrow.items.length - 1; i >= 0; i--) 
        {
          if (narrow.items[i].description.toLowerCase().indexOf(narrow.searchTerm) !== -1) 
          {
            narrow.found.push(narrow.items[i]);
            console.log("item added");
          }
        }
        if(narrow.found == false){
          narrow.flag = true;
        }
        else{narrow.flag = false;}
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    }
  }

  narrow.removeItem = function($index){
    narrow.found.splice($index, 1);
  }
}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  
  service.getMatchedMenuItems = function (searchTerm) {


    var response = $http({
      method: "GET",
      url: ApiBasePath
    });

    return response
  };
}

})();
