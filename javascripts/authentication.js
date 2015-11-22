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
			/*
			var count = 0;
			users.on("child_added", function(snap) {
				count++;
				console.log("added", snap.key());
			});
			// length will always equal count, since snap.val() will include every child_added event
			// triggered before this point
			users.once("value", function(snap) {
				console.log("initial data loaded!", Object.keys(snap.val()).length === count);
			});

			*/

			users.push({_name:username, _uid:id});
			users.once("value", function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
			    var key = childSnapshot.key();
			    var childData = childSnapshot.val();
			    console.log("Name: " + childData.val()._name + ", UID: " + childData.val()._uid);
			  });
			});

			//users.set({_name:username, _uid:id});
			
		}
	}, {
		remember: "sessionOnly",
	});	
}