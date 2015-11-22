function login() {
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '437792143082643',
	      xfbml      : true,
	      version    : 'v2.5'
	    });
	  };

	  FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
	    console.log('Logged in.');
	  }
	  else {
	    FB.login();
	  }
	});

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));

	
	/*
	var ref = new Firebase("https://highlighter.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		remember: "sessionOnly",
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
		}
	});	
*/
}