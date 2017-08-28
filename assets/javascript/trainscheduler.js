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
var database;
function Train(name,desto,freq,nexto,minawat) {
	this.trainName = name;
	this.destination = desto;
	this.frequency = freq;
	momentTime = moment(nexto);
	this.nextArrival  = momentTime.format('M Do YYYY, h:mm');
    minutesAway = minawat;
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
	var nameo = "";
	var desto = "";
	var freq = 0;
	var nextArrival = "";
	nameo = $("#train-name-input").val().trim();
	desto = $("#destination-input").val().trim();
	freq  = $("#frequency-input").val().trim();
	if (nameo == "") {
		$("#status").html("<strong>Train Name cannot be null</strong>");
	}
	if (desto == "") {
		$("#status").html("<strong>Destination cannot be null</strong>");
	}
	calculateNextArrival(freq);
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
function updateDataBase() {;
	for (i=0;i<arrayOfTrains.length;i++) {
		var result = rootRef.push(arrayOfTrains[i]);
		arrayOfRefs.push(result);
	}

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
	updateFireBase();
}
function updateFireBase() {
	console.log("in updateFireBase");
}
function calculateNextArrival(freq) {
	var now = moment();
	var start = moment().startOf('day');
	var fstart = start.format('MMMM Do YYYY, h:mm:ss a');
	var firstArrival = start.add(3,'hours');
	var ffirstArrival = firstArrival.format('MMMM Do YYYY, h:mm:ss a');
	console.log("firstArrival = " + ffirstArrival);
	var today3am;
	var timediffms = now - firstArrival;
	var duration = moment.duration(timediffms);
	var hours    = duration.hours();
	var minn = duration.minutes();
	var totalMinutes = 60*hours + minn;
	var modo = totalMinutes % freq;
	console.log(ffirstArrival);
	console.log(minn);
	console.log(hours);
	console.log("total minutes = " + totalMinutes);
	console.log("modo = " + modo);
	console.log("freq = " + freq);


	return(moment());
}



