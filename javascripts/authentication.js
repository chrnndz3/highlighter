function login() {
	var ref = new Firebase("https://highlighter.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
			var username = authData.facebook.displayName;
			var id = authData.uid;
			document.getElementById("nameInput").value= username;
			document.getElementById("uidInput").value = id;
			console.log(username);
			console.log(document.getElementById("nameInput").value);

			var users = ref.child("users");
			//if not exist
			users.push({_name:username, _uid:id});


		}
	}, {
		remember: "sessionOnly",
	});	
}