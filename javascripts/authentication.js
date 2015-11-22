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

			users.orderByChild("_name").on("value", function(snapshot) {
			  snapshot.forEach(function(data) {
			    console.log("Name: " + data.val()._name + ", UID: " + data.val()._uid);
			    return (username === data.val()._name) && (id === data.val()._uid);
			  });
			});

			users.push({_name:username, _uid:id});


		}
	}, {
		remember: "sessionOnly",
	});	
}