(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService', '$scope'];
  function ToBuyShoppingController(ShoppingListCheckOffService, $scope) {
    var ToBuy = this;

    ToBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    $scope.message = "Everything is bought!";

    ToBuy.transferItem = function (itemIndex) {
      ShoppingListCheckOffService.transferItem(itemIndex);
    };

  }


  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService', '$scope'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService, $scope) {
    var AlreadyBought = this;

    $scope.message = "Nothing bought yet";
    
    AlreadyBought.itemsAlreadyBought = ShoppingListCheckOffService.getItemsAlreadyBought();
  }


  function ShoppingListCheckOffService() {
    var service = this;

  // List of shopping items to buy
  var itemsToBuy = [
  { name: "cookies", quantity: 10 }, 
  { name: "apples", quantity: 20 }, 
  { name: "oranges", quantity: 30 }, 
  { name: "pears", quantity: 40 },
  { name: "papayas", quantity: 50 }];

// List of shopping items already bought
var itemsAlreadyBought = [];

//transfer items from to buy to already bought
service.transferItem = function (itemIndex) {
  var item = itemsToBuy[itemIndex];
  itemsAlreadyBought.push(item);
  itemsToBuy.splice(itemIndex, 1);
};

service.getItemsAlreadyBought = function () {
  return itemsAlreadyBought;
};

service.getItemsToBuy = function () {
  return itemsToBuy;
};

}

})();
