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

			var users = ref.child("users");

			users.orderByChild().on("_name", function(snapshot) {
			  snapshot.forEach(function(data) {
			    console.log("The " + data.key() + " dinosaur's score is " + data.val());
			  });
			});

			users.push({_name:username, _uid:id});


		}
	}, {
		remember: "sessionOnly",
	});	
}