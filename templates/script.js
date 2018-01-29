<script>
        'use strict'; //Defines that JavaScript code should be executed in "strict mode"
         var app = angular.module("Shopping_Cart", ["ngRoute"]);

         app.config(function($routeProvider) {
            $routeProvider
            .when('/Details', {
                  templateUrl : "Details.html",
                  controller : "parisCtrl"
                });

             // .otherwise({
             //      redirectTo: '/read';
             //   });
         });

         app.controller("parisCtrl", function ($scope) {
            $scope.content = "I love Paris";
         });

         app.controller("ResponseController", function($scope, $http){

         /*$http directive is used to communicate ot the server */
         $scope.data = {}; 
         $scope.productname = "";

          $scope.show1 = true;
          $scope.detail = $scope.delete =  true;
          $scope.show2 = $scope.show3 = false;

          $scope.show = function()
          {
            $scope.show1 = !$scope.show1;
            $scope.show2 = !$scope.show2;
          };
          
          // Read all products
          $scope.read = function(){
            $http.get("/read").then(function(response){
               $scope.content="HERE Baby";
               $scope.result =  response.data.result;
            },
            function(error){
               console.log('Error: ' + data);
               $scope.content = "Something went wrong";
            });

        };

        $scope.read();

          // delete a todo after checking it
        $scope.deleteProduct = function(id) {
          $http.delete("/delete/" + id).then(function(response) {
                alert(response.data.message);
                //$scope.content = "Done";
                $scope.read();

            },
            function(error) {
               console.log('Error: ' + data);
               $scope.content = "Something went wrong";
               // alert("Something went wrong");
            });
         };

           // when submitting the add form, send the text to the node API
        $scope.create = function() {

            var posting = $http({
                          method: 'POST',
                          url: '/add',
                          data: $scope.data,
            });
            posting.then(function (response) {
                $scope.data = {};
                $scope.content = response.data.name;
                $scope.read();
                $scope.show();

             },
              function (data) {
                console.log('Error: ' + data);
                $scope.content = "Something went wrong";
             });
          };


        $scope.edit = function(product){

              $scope.data = product;
              $scope.show3 = !$scope.show3;
              $scope.show1 = !$scope.show1;
              $scope.productname = $scope.data.name;
        };

        $scope.update = function(){

              var posting = $http({
                          method: 'PUT',
                          url: '/update/' + productname,
                          data: $scope.data,
            });
            posting.then(function (response) {
                $scope.data = {};
                $scope.content = response.data.name;
                $scope.read();
                $scope.show();
                $scope.show3 = !$scope.show3;
                $scope.show1 = !$scope.show1;

             },
              function (data) {
                console.log('Error: ' + data);
                $scope.content = "Something went wrong";
             });

        };



      /*  $scope.showDetails = function(product){

            $http.get("/read/" + product.name).then(function(response){
               $scope.result =  response.data.result;
               $scope.content = "DONE";
               $scope.detail = !$scope.detail;
               $scope.delete = !$scope.delete;
               $scope.show1 = !$scope.show1;


            },
            function(error){
               console.log('Error: ' + data);
               $scope.content = "Something went wrong";
            });
               
        };*/

});
         
         
      </script>