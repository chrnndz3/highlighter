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
			var bool = false;
			/*should add case for when no elements*/
			users.once("value", function(snapshot) {
				snapshot.forEach(function(user) {
				bool = user.val()._name === username && user.val()._uid === id;
				if (bool === true)
					return true;
			});
				
			if (bool === false)
				users.push({_name:username, _uid:id});
			console.log("end");


		}
	}, {
		remember: "sessionOnly",
	});	
}