var firstTime = true;
var count = 0;
var gencount = 0;
var minAway;
var database;
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
			count++;
		}
		if (count % 60 == 0) {
			updateMinutesAway();
		}
		count++;
	},1000);
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
function Train(name,desto,freq,nexto,minawat) {
	this.trainName = name;
	this.destination = desto;
	this.frequency = freq;
	momentTime = moment(nexto);
	this.nextArrival  = momentTime.format('M Do YYYY, h:mm');
    minutesAway = minawat;
	this.minutesAway = minawat;
};
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
	gencount++;
	var tempnum = Math.round(Math.random()*100);
	return(gencount);
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
	firebase.initializeApp(config);
	database = firebase.database();
	rootRef = firebase.database().ref("TrainScheduler");
	//createTrains();
	createTable();
}
function createATrain() {
	var nameo = "";
	var desto = "";
	var freq = 0;
	var nextArrival = "";
	var minutesAway = 0;
	var first = "";
	var now = moment();
	var status = 0;
	console.log("in createATrain");
	nameo = $("#train-name-input").val().trim();
	desto = $("#destination-input").val().trim();
	freq  = $("#frequency-input").val().trim();
	first = $("#first-input").val().trim();
	if (nameo.length == 0) {
		$("#status").html("<strong>Train Name cannot be null</strong>");
		status = 1;
	}
	if (desto == "") {
		$("#status").html("<strong>Destination cannot be null</strong>");
		status =1;
	}
	if (desto.length == 0) {
		$("#status").html("<strong>Destination cannot be null</strong>");
		status = 1;
	}
	if (freq<30 ) {
		$("#status").html("<strong>Frequency must be greater that 29 </strong>");
		status =1;
	} 
	if (first == "" ) {
		$("#status").html("<strong>First Arrival Time cannot be null</strong>");
		status =1;
	}
	if (first.length  !=  5 ) {
		$("#status").html("<strong>Enter first arrival time as HH:MMl</strong>");
		status =1;
	}
	if (status == 0) {
	nextArrival = calculateNextArrival(freq,first);
	var timediffms = nextArrival - now;
	var duration = moment.duration(timediffms);
	var minutesAway = Math.round(duration/60000);
	var t = new Train(nameo,desto,freq,nextArrival,minutesAway);
	arrayOfTrainNames.push(nameo);
	var result = arrayOfTrains.push(t);
	arrayOfDestinations.push(desto);
	arrayOfRefs.push(result);
	var result = rootRef.push(t);
	//
	    r = $("<tr>");
		w=t;
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
        data.html(nextArrival);
        r.append(data);
        data=$("<td>");
        data.attr("id","away"+i);
        data.html(minutesAway);
        r.append(data);
        $("#table-body").append(r);
             database.ref().push(
	    {
		trainName: name,
		destination: destination,
		firstarrival: first,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	})
    $("#status").html("<strong>Success train added</strong>");
      }  

}
function createTable() {
	var arrayOfCatagories = ["Train Naame","Destination","Frequency","Next Arrival","Minutes Away",];
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
        data.html(nextArrival);
        r.append(data);
        data=$("<td>");
        data.attr("id","away"+i);
        data.html(minutesAway);
        r.append(data);
        $("#table-body").append(r);
	}
	$("#table-body").append(r);
}
function updateMinutesAway() {
	for (i=0;i<arrayOfTrains.length;i++) {
		if (arrayOfTrains[i].minutesAway > 0) {
		  arrayOfTrains[i].minutesAway--;
		  $("#away"+i).html(arrayOfTrains[i].minutesAway);
	    } else {
		  $("#away"+i).html("arrived");
	    }
	    if (arrayOfTrains[i].minutesAway == 0 ) {
	    	$("#away"+i).html("arrived");
	    }	
	}
}
function calculateNextArrival(freq,first) {
	var now = moment();
	var hoursin = first.slice(0,2);
	var minutesin = first.slice(3,5);
	var nextArrival ="";
	var start = moment().startOf('day');
	var fstart = start.format('MMMM Do YYYY, h:mm:ss a');
	//var firstArrival = start.add(3,'hours');
	var firstArrival = start.add(hoursin,'hours');
	firstArrival  - firstArrival.add(minutesin,'minutes');
	var ffirstArrival = firstArrival.format('MMMM Do YYYY, h:mm:ss a');
	console.log("firstArrival = " + ffirstArrival);
	var today3am;
	var timediffms = now - firstArrival;
	var duration = moment.duration(timediffms);
	var hours    = duration.hours();
	var minn = duration.minutes();
	var totalMinutes = 60*hours + minn;
    if (totalMinutes > freq) {
	  var modo = totalMinutes % freq;
	 } else {
	 	var modo = freq;
	 }
	var tt = now.add(freq-modo,'minutes');
	return(tt);
}





