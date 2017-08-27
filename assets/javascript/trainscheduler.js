var firstTime = true;
var count = 0;
var stationTimer = setInterval(function() {
	    var dd = new Date();
	    var day = dd.getDay();
	    var month = dd.getMonth();
		var hour = dd.getHours();
		var minutes = dd.getMinutes();
		var scsonds = dd.getSeconds();
		var rightNow = hour+":"+minutes+":"+scsonds;
		$("h1").text("Train schedule current time: "+ hour+":"+ minutes+ ":" + scsonds);
		if (firstTime) {
			firstTime = false;
			console.log("firstTime was true");
			count++;
		}
		if (count % 60 == 0) {
			updateMinutesAway();
		}
		count++;
		console.log("count = " + count);
	},2000);
var arrayOfTrains = [];
var arrayOfDestinations = ["Cleveland","chicago","Dallas","San Francisco","Indianapolis","Columbus","hartford"];
var arrayOfTrainNames   = ["Blazer","WindyExpress","Cowboy","West Coast","Indy","Capitol","East Coast"];
var arrayOfRefs =[];
var timeStarted = new Date()
var connectAS ="";
var train = {
	trainName:  "",
	destination: "",
	frequency:   0,
	nextArrival: "",
	minutesAway:  0
	};
var config = {
    apiKey: "AIzaSyDUDwognydTUiE1UKjzsgv7d85dY-4faPE",
    authDomain: "bob-sproject.firebaseapp.com",
    databaseURL: "https://bob-sproject.firebaseio.com",
    projectId: "bob-sproject",
    storageBucket: "bob-sproject.appspot.com",
    messagingSenderId: "797447312452"
  };
 var rootRef;
var database;
function Train(name,desto,freq,nexto,minawat) {
	this.trainName = name;
	this.destination = desto;
	this.frequency = freq;
	this.nextArrival = nexto;
	this.minutesAway = minawat;
};
function clerk() {
  connectAs = "c";
  $("#buttons").remove();
  $("#status").text("connected as clerk");
  $("#addtrain").remove();
  //createTrains();
}
function administrator() {
  connectAs = "a";
  $("#buttons").remove();
  $("#status").text("connected as administrator");
  $("#addtrain").show();
  //createTrains();
}
function createTrains() {
	minaway = generateMinutes()
	var currentDate = new Date();
	for (j=0;j<arrayOfTrainNames.length;j++) {
	  var minAway = generateMinutes();
	  var arriveAt = calculateArrivalTime(minAway);	
	  var freq = generateFrequence();
	  var t = new Train(arrayOfTrainNames[j],arrayOfDestinations[j],freq,arriveAt,minAway);
	  arrayOfTrains.push(t);
    }
function generateMinutes() {
	var tempnum = Math.round(Math.random()*100);
	return(tempnum);
}
function calculateArrivalTime (aw) {
	var dd = new Date();
	var arrivalDate = addMinutes(dd,aw);
	return(arrivalDate);
}
function generateFrequence () {
	var tempnum = Math.round(Math.random()*1000);
	if (tempnum <20) {
		tempnum = 30;
	}
	if (tempnum < 100) {
		tempnum = 120;
	}
	return(tempnum);
	
}
}
function addMinutes(datein,minutesin){
	return new Date(datein.getTime() + minutesin*60000);
}
function initialize() {
	$("#addtrain").hide();
	firebase.initializeApp(config);
	database = firebase.database();
	rootRef = firebase.database().ref("TrainScheduler");
	createTrains();
	createTable();
	rootRef.remove();
	updateDataBase();
}
function createATrain() {
	console.log("in create a train");
}
function createTable() {
	console.log("in createTable");
	var arrayOfCatagories = ["Train Name","Destination","Frequency","Next Arrival","Minutes Away",];
	var w;
	var h;
	var r = $("<tr>");
	var name ="";
	var destination;
	var frequency;
	var nextArrival;
	var minutesAway;
	for (i=0;i<arrayOfTrains.length;i++) {
		r = $("<tr>");
		w=arrayOfTrains[i];
        name = w.trainName;
        frequency = w.frequency;
        nextArrival = w.nextArrival;
        momentTime = moment(nextArrival);
        nextArrivalFormatted = momentTime.format('M Do YYYY, h:mm');
        minutesAway = w.minutesAway;
        destination = w.destination;
        data = $('<td>');
        data.html(name);
        r.append(data);
        data = $("<td>");
        data.html(destination);
        r.append(data);
        data = $("<td>");
        data.html(frequency);
        r.append(data)
        data = $("<td>");
        data.html(nextArrivalFormatted);
        r.append(data);
        data=$("<td>");
        data.attr("id","away"+i);
        data.html(minutesAway);
        r.append(data);
        $("#table-body").append(r);
	}
	$("#table-body").append(r);
}
function updateDataBase() {;
	console.log("in update database");
	for (i=0;i<arrayOfTrains.length;i++) {
		console.log(i);
		var result = rootRef.push(arrayOfTrains[i]);
		arrayOfRefs.push(result);
	}

}
function updateMinutesAway() {
	console.log("in updateMinutesAway");
}
