(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('HomeController', HomeController)
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  HomeController.$inject = ['MenuDataService'];
  function HomeController(MenuDataService) {
    var $ctrl = this;

    // STEP 0: Declare a variable to hold random category short_name
    var randomCategoryShortName = "";

    // STEP 1: Retrieve all categories from the MenuDataService
    var promise = MenuDataService.getAllCategories();

    // STEP 2: When the promise is resolved, set randomCategoryShortName to a random short_name
    promise.then(function (response) {
      var categories = response.data;
      var randomIndex = Math.floor(Math.random() * categories.length);
      randomCategoryShortName = categories[randomIndex].short_name;
    });

    // STEP 3: Expose randomCategoryShortName to the view
    $ctrl.getRandomCategoryShortName = function () {
      return randomCategoryShortName;
    };

    // STEP 4: Function to navigate to a random category
    $ctrl.goToRandomCategory = function () {
      $ctrl.loadMenuItems(randomCategoryShortName);
    };
  }

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    // Function to retrieve all categories
    service.getAllCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });

      return response;
    };
  }

})();
