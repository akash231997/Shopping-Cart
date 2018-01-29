
firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
	  if (user.emailVerified) {
	    // User is signed in.
	    document.getElementById("logged_in").style.display = "none";
	    window.location = '/templates/app.html';
	    //document.getElementById("logged_in").style.display = "none";
	  } 
	  else {

	  	document.getElementById("logged_in").style.display = "block";
	  }
	}
});


function Login(){

	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	// LogIn
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		document.getElementById("logged_in").style.display = "none";
	    window.location = '/templates/app.html';

	}).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;

  		if(errorCode = "auth/user-not-found")
  		{
  			bootbox.alert({
		        message: "No User with this account",
		        backdrop: true
    		});
  		}
  		
  		document.getElementById("password").value = "";
	});

}

function Sign_up() {

	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	// SignIn
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {

		// Email verification
		var user = firebase.auth().currentUser;
		user.sendEmailVerification().then(function() {
		  // Email sent.
		  bootbox.alert({
		        message: "Please verify your email",
		        backdrop: true
    		});

		}).catch(function(error) {
		  // An error happened.
		  bootbox.alert({
		        message: "Error :" + errorMessage,
		        backdrop: true
    		});

		});


	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  if(errorCode == "auth/weak-password")
		window.alert("Errors: " + errorMessage);
	  else if(errorCode == "auth/email-already-in-use") {
	  	bootbox.alert({
	        message: "Email alredy exists, Please Login",
	        backdrop: true
		});
	  }
  	  else
  	  {
  	  	bootbox.alert({
	        message: "Please verify your email",
	        backdrop: true
    	});
  	  }

	  document.getElementById("password").value = "";

	});
}

function LogOut(){

	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	    window.location = '/templates/sign_up.html';
	 	  
	}).catch(function(error) {
		// An error happened.
		window.alert("Errors: " + errorMessage);
	     
	});
}

function reset() {

	document.getElementById("pass").style.display = "none";
	document.getElementById("bttn1").style.display = "none";
	document.getElementById("bttn2").style.display = "block";
	document.getElementById("heading").innerHTML = "Reset Password";
}

// Send verification link for password reset
function send_link() {

	var auth = firebase.auth();
	var emailAddress = document.getElementById("email").value;
	auth.sendPasswordResetEmail(emailAddress).then(function() {
		bootbox.alert({
		    message: "Please check your mailbox",
		    backdrop: true
    	});

		document.getElementById("email").value = "";
		localStorage.setItem("emailAddress", emailAddress);
	  // Email sent.
	}).catch(function(error) {
	  // An error happened.
	});
}


// Reset password
function handleResetPassword(auth, actionCode, newPassword) {

  var accountEmail;
  // Verify the password reset code is valid.
  auth.verifyPasswordResetCode(actionCode).then(function(email) {
    var accountEmail = email;

    // Save the new password.
    auth.confirmPasswordReset(actionCode, newPassword).then(function(resp) {
      // Password reset has been confirmed and new password updated.

      // TODO: Display a link back to the app, or sign-in the user directly
      // if the page belongs to the same domain as the app:
      // auth.signInWithEmailAndPassword(accountEmail, newPassword);

      bootbox.alert({
		    message: "Password changed Successfully",
		    backdrop: true

    	});

      setTimeout(function(){ 
      		window.location = "/templates/Log_in.html";
       }, 2000);
      


    }).catch(function(error) {
    	alert(error);
	    // Error occurred during confirmation. The code might have expired or the
	    // password is too weak.
    });
  }).catch(function(error) {
  		alert(error);
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
  });

}
