        //Defines that JavaScript code should be executed in "strict mode"
        'use strict'; 
         var app = angular.module("Shopping_Cart", ["ngRoute"]);

         app.config(function($routeProvider) {
            $routeProvider
            .when('/Details', {
                  templateUrl : "Details.html"
                  
            })
            .when('/Cart', {
                  templateUrl : "cart.html",
                  controller: "Controller"
            })

            .otherwise({
                  templateUrl: 'store.html'
            });
         });

          /*$http directive is used to communicate ot the server */
          app.controller("ResponseController", function($scope, $http, $rootScope){
         
          $scope.data = {}; 
          $scope.productname = "";

          $scope.show1 = true;
          
          $scope.show2 = $scope.show3 = false;
          $scope.detail = $scope.delete = true;
          
          $scope.toggle = function()
          {
            $scope.show1 = !$scope.show1;
            $scope.show2 = !$scope.show2;
            $scope.detail = !$scope.detail;
            $scope.delete = !$scope.delete;
            $scope.data = {};
          };

          $scope.cancel = function()
          {
            $scope.show1 = !$scope.show1;
            $scope.show3 = !$scope.show3;
          };

          
          
          // Read all products
          $scope.read = function(){
     
            $http.get("/read").then(function(response){

            //Admin rights
            var user = firebase.auth().currentUser;
            if (user) {
                // User is signed in.
                //console.log(user.email);
                if(user.email == "agupta231997@gmail.com")
                  $scope.detail = $scope.delete =  $scope.show1 = true;
                else
                  $scope.detail = $scope.delete =  $scope.show1 = false;


            } else {
                console.log("No user");
                 // No user is signed in.
            }

            $rootScope.result = $scope.result =  response.data.result;
          // cart_summary();

            },
            function(error){
               console.log('Error: ' + data);
               //$scope.content = "Something went wrong";
            });

          };

          // Delete a todo after checking it
          $scope.deleteProduct = function(id) {

            var r = confirm("Sure to delete!");
            if (r == true) {

                 $http.delete("/delete/" + id).then(function(response) {
                  alert(response.data.message);
                  $scope.read();

                 },
                 function(error) {
                     console.log('Error: ' + data);
                     $scope.content = "Something went wrong";
                     // alert("Something went wrong");
                 });
            }
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
                //$scope.content = response.data.name;
                $scope.read();
                $scope.show();

             },
              function (data) {
                console.log('Error: ' + data);
                $scope.content = "Something went wrong";
             });

          };


          // Show product details
          $scope.show = function(product){

              $scope.productname = product.name;
              localStorage.setItem("productname", product.name);
          };

          $scope.showDetails = function(){

              var product_name =   localStorage.getItem("productname"); 
              $http.get("/" + product_name).then(function(response){

                  $scope.data = $scope.result =  response.data.result;

              },
              function(error){
                  alert("Error");
                  console.log('Error: ' + data);
                  //$scope.content = "Something went wrong";
              });
               
          };

          // Update query
          $scope.edit = function(product){

              $scope.productname = product.name;
              $scope.show3 = !$scope.show3;
              $scope.show1 = !$scope.show1;
              $scope.show(product);
              $scope.showDetails();
             // $scope.data = $scope.result;
          };

          $scope.update = function(){

              var posting = $http({
                          method: 'PUT',
                          url: '/update/' + $scope.productname,
                          data: $scope.data,
              });
              console.log("updated");
   
              posting.then(function (response) {
                  $scope.show3 = !$scope.show3;
                  $scope.show1 = !$scope.show1;

              },
              function (data) {

                console.log('Error: ' + data);
               // $scope.content = "Something went wrong";
             });

          };

         
        // // cart summary for all pages
        // function cart_summary(){

        //       var email;
        //       var data = $scope.result;
        //       var user = firebase.auth().currentUser;
        //       if (user) {
        //         // User is signed in.
        //         email = user.email.split('.');

        //       } else {
        //         console.log("No user");
        //         // No user is signed in.
        //       }

        //     var i, cart_total=0, cart_sum=0;
        //     database.child(email[0]).on('value', snapshot => {

        //         snapshot.forEach(childSnapshot => {
        //           cart_total = parseInt(cart_total) + parseInt(childSnapshot.val());
        //           for(i=0; i<data.length; i++)
        //           {
        //             if(data[i].name == childSnapshot.key)
        //             {
        //               break;
        //             }
        //           }
        //           if(childSnapshot.key != "zz")
        //             cart_sum = parseInt(cart_sum) + parseInt(childSnapshot.val())*parseInt(data[i].price);

        //         });
                 
        //       $scope.cart_sum = cart_sum;
        //       $scope.cart_total = cart_total;

        //     });
           

        // }   
 
});
