// CREATE A REFERENCE TO FIREBASE
var messagesRef = new Firebase('https://highlighter.firebaseio.com/groups');

// REGISTER DOM ELEMENTS
var nameField = $('#nameInput');
var idField = $('#idInput');
var messageField = $('#messageInput');
var messageList = $('#example-messages');

var groupField = $('#groupInput');
var topicField = $('#topicInput');

var curGroup = "";
var curMessage = "";

// LISTEN FOR KEYPRESS EVENT
messageField.keypress(function (e) {
  if (e.keyCode == 13) {
    //FIELD VALUES
    var username = nameField.val();
    var id = idField.val();
    var message = messageField.val();

    var group = groupField.val();
    var topic = topicField.val();

    //SAVE DATA TO FIREBASE AND EMPTY FIELD
    if (curGroup == "" || curGroup != group) {
      console.log(group); //asdasds
      curGroup = messagesRef.push({_group:group});
    }
    console.log(curGroup);
    console.log(curGroup.key());
    messagesRef.once('child_added', function(data) {
      curMessage = messagesRef.child(curGroup.key()).push({id:id, name:username, text:message});
      messageField.val('');
    });
  }
});

// Add a callback that is triggered for each chat message.

messagesRef.child(curMessage.key()).limitToLast(10).on('child_added', function (snapshot) {

  //GET DATA
  var data = snapshot.val();
  console.log(data);
  console.log(data.val());

  var username = data.val().name || "anonymous";
  var message = data.val().text;


  //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
  var messageElement = $("<li>");
  var nameElement = $("<strong class='example-chat-username'></strong>")
  nameElement.text(username);
  messageElement.text(message).prepend(nameElement);

  //ADD MESSAGE
  messageList.append(messageElement)

  //SCROLL TO BOTTOM OF MESSAGE LIST
  messageList[0].scrollTop = messageList[0].scrollHeight;
});
