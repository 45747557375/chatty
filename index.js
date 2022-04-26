var firebaseConfig = {
    apiKey: "AIzaSyBrK6RM99GPugYlrgMTq62H_ijVSeX0Vo8",
    authDomain: "chatty-69009.firebaseapp.com",
    databaseURL: "https://chatty-69009-default-rtdb.firebaseio.com",
    projectId: "chatty-69009",
    storageBucket: "chatty-69009.appspot.com",
    messagingSenderId: "301916699338",
    appId: "1:301916699338:web:61ff1681475a7a474c5233"
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.database();

  const username = prompt("Please Tell Us Your Name");

  document.getElementById("message-form").addEventListener("submit", sendMessage);

  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }

  const fetchChat = db.ref("messages/");

  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });

  