  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBo6fu18ThhrgfItRct4uU1-9STXu6TCP4",
    authDomain: "ucbe-bootcamp-db.firebaseapp.com",
    databaseURL: "https://ucbe-bootcamp-db.firebaseio.com",
    projectId: "ucbe-bootcamp-db",
    storageBucket: "ucbe-bootcamp-db.appspot.com",
    messagingSenderId: "592523090499"
  };
  firebase.initializeApp(config);

$(function() {

// create variable to reference db

var database = firebase.database();

// local variables 

var trainName = '';
var destination = '';
var frequency = '';
var nextArrival = 0;
var minutesAway = '';



$(document).on("click", "button[type=submit]", function (event) {
    //$("#submit-bid").on("click", function (event) {
        event.preventDefault();
        console.log("Add Train");
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();


        var newElement = {
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };
        console.log($("#trainName").val());
       
        database.ref().push(newElement);
    });

// }
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    $("#trainTable").append("<tr><td scope='col'>" + sv.trainName + "</td>" +
        "<td scope='col'>" + sv.destination + "</td>" +
        "<td scope='col'>" + sv.frequency + "</td>" +
        "<td scope='col'>" + " " + "</td>" +
        "<td scope='col'>" + ''  + "</td>" +
        "<td scope='col'>" + " " + "</td> ></tr>");


});

})