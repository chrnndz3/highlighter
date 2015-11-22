// CREATE A REFERENCE TO FIREBASE
var messagesRef = new Firebase('https://highlighter.firebaseio.com/groups');

// REGISTER DOM ELEMENTS
var nameField = $('#nameInput');
var idField = $('#idInput');
var messageField = $('#messageInput');
var messageList = $('#example-messages');

var groupField = $('#groupInput');
var topicField = $('#topicInput');
var topicList = $('#topics');
var subField;

var curGroup = "";
var curMessage = "";



topicField.keypress(function (e) {
  if (e.keyCode == 13) {

    var topicElement = $("<ul id='subField' class ='close'>");
    var listElement = $("<li></li>");
    var nameElement = $("<h3></h3>");
    nameElement.text(topicField.val());
    topicElement.prepend(nameElement);
    topicList.append(topicElement);
    subField = $('#subField');

  }
});

// LISTEN FOR KEYPRESS EVENT
messageField.keypress(function (e) {
  if (e.keyCode == 13) {
    //FIELD VALUES
    var username = nameField.val();
    var id = idField.val();
    var message = messageField.val();

    var group = groupField.val();
    var topic = topicField.val();

    messagesRef.push({id:id, name:username, text:message})

  }
});

// Add a callback that is triggered for each chat message.

messagesRef.limitToLast(10).on('child_added', function (snapshot) {

  //GET DATA
  var data = snapshot.val();

  var username = data.name || "anonymous";
  var message = data.text;


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
