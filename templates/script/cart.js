
  var database = firebase.database().ref();
  var email, data;

  // Get user id
  firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        var user = firebase.auth().currentUser;
        email = user.email.split('.');
        document.getElementById("userId").innerHTML = user.email;

        // Make new cart in firebase with email as id
        database.child(email[0]).child("zz").set(0);


      }
  });

  // Add item to the cart
  function add(productname) {
        database.child(email[0]).child(productname).set(1);
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){
         x.className = x.className.replace("show", ""); 
        }, 1000);
        console.log("Added");
    }

   
  function cart() {

    var objRef = database.child(email[0]);
    var table =   document.getElementById('list');
    var count = 0, last_val="", sum =0, total_items=0, count;


    // Sync with Firebase in real time.
    objRef.on('value', snap => {
      var items = JSON.stringify(snap.val(), null, 3);

    });


    // Sync list changes
    objRef.on('child_added', snap => {
       
      if(((last_val != snap.key && last_val != "") || snap.key == "zz") && parseInt(count)>0)
      {

          var i;
          for( i=0; i<data.length; i++)
          {
            if(data[i].name == last_val)
              {
                break;
              }
          }

          sum = parseInt(sum) + parseInt(data[i].price)*parseInt(count);
          total_items = parseInt(total_items) + parseInt(count);

          console.log(last_val);
          console.log(snap.key);
          console.log(count);

          var tr = document.createElement('tr');
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');  
          var td3 = document.createElement('td'); 
          var bttn1 = document.createElement('BUTTON'); 
          var bttn2 = document.createElement('BUTTON');
          var bttn3 = document.createElement('BUTTON');

          tr.className = "cart_row";
          td1.innerText = last_val;
          td2.id = last_val;
          td3.innerText = "$" + parseInt(data[i].price)*parseInt(count);
          td3.id = last_val + "_price";

          bttn1.className = "bttn1"
          bttn2.className = "bttn2";
          bttn1.id = last_val + "1";
          bttn2.id = last_val + "2";
          bttn3.id = last_val + "_quantity";
          bttn3.className = "text";

          var t = document.createTextNode("+");
          bttn1.appendChild(t);
          t = document.createTextNode("-");
          bttn2.appendChild(t);
          t = t = document.createTextNode(count);
          bttn3.appendChild(t);

          table.appendChild(tr);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          td2.appendChild(bttn3);
          td2.appendChild(bttn1);
          td2.appendChild(bttn2);


          count = snap.val();
          last_val = snap.key;

      }
     else if(last_val == snap.key || last_val == "" || (parseInt(count) == 0))
      {
          count = parseInt(count) + parseInt(snap.val());
          last_val = snap.key;
      }

    });
    


    function add(e) {
               
      if(e.target.id.includes("1"))  
      {
        var item = document.getElementById(this.id).parentNode.id;
      //  console.log(item);
        database.child(email[0]).on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
              if(childSnapshot.key == item)
                {
                  count = childSnapshot.val();
               //   console.log(count);
                }

            });
        });
        database.child(email[0]).child(item).set(parseInt(count)+parseInt(1));

      }     
    }



    function subtract(e) {   
             
       if(e.target.id.includes("2"))  
        {
            var item = document.getElementById(this.id).parentNode.id;
            database.child(email[0]).on('value', snapshot => {
               snapshot.forEach(childSnapshot => {
                   if(childSnapshot.key == item)
                      {
                        count = childSnapshot.val();
                     //   console.log(count);
                      }

                });
             });
             if(count > 0)
                database.child(email[0]).child(item).set(parseInt(count)-parseInt(1));
          }
     }



      // For the buttons in the quantity column
      function event(){

            var x = document.getElementsByClassName("bttn1");
            for (var i = 0; i < x.length; i++) {
                  x[i].addEventListener("click", add, false);
            } 

            var x = document.getElementsByClassName("bttn2");
            for (var i = 0; i < x.length; i++) {
                x[i].addEventListener("click", subtract, false);
             } 

      }


      // Delete the data from firebase database
      document.getElementById("b2").addEventListener("click", function() {
        database.child(email[0]).on('value', snapshot => {
          snapshot.forEach(childSnapshot => {

            if(childSnapshot.key != "zz")
            {
              database.child(email[0]).child(childSnapshot.key).remove();
            }

          });
        });

       var x = document.getElementsByClassName("cart_row");
       for(var i=0; i<x.length; i++)
       {
         x[i].style.display = "none";
       }
       document.getElementById("total_items").innerHTML = 0;
       document.getElementById("sum").innerHTML = "$" + 0;

      });

      

     // Run everytime when data in firebase changes
     objRef.on('child_changed', snap => {

        // Changes the particular row
        var tdChanged = document.getElementById(snap.key);

        document.getElementById(tdChanged.id + "_quantity").innerHTML = snap.val();

        var i;
        for( i=0; i<data.length; i++)
        {
          if(data[i].name == snap.key)
             {
              break;
             }
        }

         // Changes the value in the last row and in price column
         var price_temp = document.getElementById(snap.key + "_price").innerHTML;
         price_temp = price_temp.slice(1);
        
         var sum_temp = (document.getElementById("sum").innerHTML).slice(1);
         var p = data[i].price;
        if(parseInt(count) < parseInt(snap.val()))
        {
           document.getElementById(snap.key + "_price").innerHTML = "$" + (parseInt(price_temp) + parseInt(p));
           document.getElementById("sum").innerHTML = "$" + (parseInt(sum_temp) + parseInt(p));
           var t = document.getElementById("total_items").innerHTML;
           document.getElementById("total_items").innerHTML= parseInt(t) + parseInt(1); 
        }
        else if(parseInt(count) > parseInt(snap.val()) && parseInt(sum_temp) > 0)
        {
           document.getElementById(snap.key + "_price").innerHTML = "$" + (parseInt(price_temp) - parseInt(p));
           
           document.getElementById("sum").innerHTML = "$" + (parseInt(sum_temp) - parseInt(p));
           var t = document.getElementById("total_items").innerHTML;
           document.getElementById("total_items").innerHTML= parseInt(t) - parseInt(1); 

        }
        event();
          
     });


     // Display the last row of the cart table
     function display()
      { 
          var h = document.createElement('hr');
          var tr = document.createElement('tr');
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');  
          var td3 = document.createElement('td'); 

          tr.id = "last";
          td1.innerText = "Total"
          td2.innerText = total_items;
          td2.id = "total_items";
          td3.innerText = "$" + sum;
          td3.id = "sum";
        
          table.appendChild(h);
          table.appendChild(tr);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);

          event();

      }
      setTimeout(display, 700);
    
  }


  // cart() function calls onload and whole database is available
  var app = angular.module("Shopping_Cart");
  app.controller("Controller", function($scope, $rootScope){          
      // Read all products for finding total
      data = $rootScope.result;
      cart();

  });  

