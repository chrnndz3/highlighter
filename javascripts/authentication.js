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

			/*should add case for when no elements*/
			ref.once("value", function(snapshot) {
				snapshot.forEach(function(user) {
				console.log("Name: " + user.val()._name + ", UID: " + user.val()._uid);

				});
			});
			//users.push({_name:username, _uid:id});


		}
	}, {
		remember: "sessionOnly",
	});	
}