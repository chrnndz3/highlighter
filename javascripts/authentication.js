function login() {
	var ref = new Firebase("https://highlighter.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
			console.log("here");
			var username = authData.facebook.displayName;
			var id = authData.uid;
			document.getElementById("nameInput").innerHTML = username;
			document.getElementById("uidInput").innerHTML = id;
			console.log(username);
			console.log(document.getElementById("nameInput").innerHTML);

			var users = ref.child("users");
			//if not exist
			users.push({name:username, uid:id});


		}
	}, {
		remember: "sessionOnly",
	});	
}