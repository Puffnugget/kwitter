var firebaseConfig = {
      apiKey: "AIzaSyDaD1JF1uCAAUk4POeg_3uDdPP_roBPJsk",
      authDomain: "kwitter-36bbd.firebaseapp.com",
      databaseURL: "https://kwitter-36bbd-default-rtdb.firebaseio.com",
      projectId: "kwitter-36bbd",
      storageBucket: "kwitter-36bbd.appspot.com",
      messagingSenderId: "96631286899",
      appId: "1:96631286899:web:fdce38f2fea038d465ce06",
      measurementId: "G-93MFHT9BF3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//     const analytics = getAnalytics(app);

username = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome " + username;

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room name - " + Room_names);
                  row = "<div class='room_name' id="+Room_names+" onclick='redirect(this.id)'>"+Room_names+"</div> <hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function addRoom() {
      var addRoom = document.getElementById("addRoom").value;
      localStorage.setItem("roomName", addRoom);
      firebase.database().ref("/").child(addRoom).update({
            purpose: "adding room name"
      });
      localStorage.setItem("roomName", addRoom);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("roomName");
      window.location = "index.html";
}

function redirect(room){
      console.log(room);
      localStorage.setItem("roomName", room);
      window.location = "kwitter_page.html";
}