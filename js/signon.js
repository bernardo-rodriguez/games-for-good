function register(){
	var email = document.getElementById("email").value;
	var username = document.getElementById('username').value;
	var pass = document.getElementById('password').value;

	if (pass.length < 6 || pass.length > 16 || pass == username || pass == email){
		document.getElementById('error').innerHTML = "Passwords must be between 6-16 characters and can't be your user id or email";
	} else {
		document.getElementById('error').innerHTML = ''
		firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
		  	// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  	document.getElementById('error').innerHTML = error.message
		}).then(function(){
			// var user = firebase.auth().currentUser;
			window.location.href = '../index.html';
			/*
			if (user != null){
				user.updateProfile({ displayName: 'username' })
				window.location.href = '../public/index.html'
			}*/
		});
	}
}

function signIn(){
    var email = document.getElementById("email").value;
	var password = document.getElementById('password').value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
 		// Handle Errors here.
 		console.log('error signing in')
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		document.getElementById('error').innerHTML = error.message
	}).then(function(){
		window.location.href = '../index.html';
		console.log(firebase.auth().currentUser);
	});
}

function isSignedIn(){
	var user = firebase.auth().currentUser;
	if (user){
		console.log("he's in mother");
	} else{
		console.log('nope');
	}
	return 0;
}

function logOut(){
	firebase.auth().signOut().then(function() {
 		location.reload;
	}, function(error) {
 		console.log('signout error: ' + error)
	});
}
