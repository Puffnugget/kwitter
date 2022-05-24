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
//     const analytics = getAnalytics(app)

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomName");
    window.location = "index.html";
}

var roomName = localStorage.getItem("roomName");
var userName = localStorage.getItem("username");

function send() {
    var msg = document.getElementById("msginput").value;
    firebase.database().ref(roomName).push({
        name: userName,
        message: msg,
        like: 0,
    });
    document.getElementById("msginput").value = "";
}

function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                user_name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + user_name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}

getData();

function updateLike(message_id){
    console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(roomName).child(message_id).update({
		like : updated_likes  
	 });
}