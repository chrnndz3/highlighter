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
			document.getElementById("idInput").value = id;

			var users = ref.child("users");
			var bool = false;
			
			users.child(authData.uid).set({_name:username});
			
			//debug
			// users.push({_name:username, _uid:id});
			// users.once("value", function(snapshot) {
			//   snapshot.forEach(function(childSnapshot) {
			//     var key = childSnapshot.key();
			//     var childData = childSnapshot.val();
			//     console.log("Name: " + childData.val()._name + ", UID: " + childData.val()._uid);
			//   });
			// });
			
		}
	}, {
		remember: "sessionOnly",
	});	
}