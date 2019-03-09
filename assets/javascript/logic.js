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
    //var trainTime ='';
   //s var nextArrival = 0;
    // var minutesAway = '';
   // var firstTrainTime='';
   //var nextTrainTime ='';

   


    $(document).on("click", "button[type=submit]", function (event) {
        //$("#submit-bid").on("click", function (event) {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        trainTime = $("#trainTime").val().trim();

        
        var firstTrainTime = moment($("#trainTime").val().trim(),"HH:mm").format("HH:mm");;


        var newElement = {
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            trainTime: firstTrainTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };
       // console.log(" first Train Time" ,firstTrainTime);

        database.ref().push(newElement);

        // Clear the Input Fields for Trains
        $("#trainName").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#nextTrainTime").val(""); 
        trainTime='';
        firstTrainTime='';
        
    });

    // }
    database.ref().on("child_added", function (snapshot) {

           var sv = snapshot.val();
           var now = new Date();

           //console.log(now.getMinutes());
           //---------------------------Time----------------------//

           var firstTrainTime = moment.unix(parseInt(sv.trainTime)).format("hh:mm");
           var Traindiff = moment(now, 'minutes').diff(parseInt(firstTrainTime),'minutes');
           var timeRemaining = Traindiff % sv.frequency;
           var minutesRemaining = (sv.frequency - timeRemaining);
           var nextTrain = moment().add(minutesRemaining, 'minutes').format('h:mm a');
         //  console.log(firstTrainTime, Traindiff, timeRemaining, minutesRemaining);
         
           //------------   Time to next Train above------------------//
       
        $("#trainTable").append("<tr><td scope='col'>" + sv.trainName + "</td>" +
            "<td scope='col'>" + sv.destination + "</td>" +
            "<td scope='col'>" + sv.frequency + "</td>" +
            "<td scope='col'>" + nextTrain + "</td>" +
            "<td scope='col'>" + minutesRemaining + "</td> ></tr>");

    });

})