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

$(function () {

    // create variable to reference db

    var database = firebase.database();

    // local variables 

    var trainName = '';
    var destination = '';
    var frequency = '';
    var nextArrival = 0;
    var minutesAway = '';

    function TrainAway(currentTime){
        var a = moment([2007, 0, 29]);
        var b = moment([2007, 0, 28]);
        a.diff(b, 'days') 
        //var currentTime =(moment().now());
        //return currentTime;
    }


    $(document).on("click", "button[type=submit]", function (event) {
        //$("#submit-bid").on("click", function (event) {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        minutesAway = moment().toNow() +frequency;
       // var currentTime = TrainAway();
        //console.log(currentTime);

        var newElement = {
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            minutesAway: minutesAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };
        console.log($("#trainName").val());

        database.ref().push(newElement);
        $("#trainName").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#minutesAway").val(""); 
    });

    // }
    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();

        $("#trainTable").append("<tr><td scope='col'>" + sv.trainName + "</td>" +
            "<td scope='col'>" + sv.destination + "</td>" +
            "<td scope='col'>" + sv.frequency + "</td>" +
            "<td scope='col'>" + " " + "</td>" +
            "<td scope='col'>" + '' + "</td>" +
            "<td scope='col'>" + sv.minutesAway + "</td> ></tr>");


    });

})