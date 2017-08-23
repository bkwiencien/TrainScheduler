var arrayOfDestinations = ["Cleveland","chicago","Dallas","san Francisco","Indianapolis","Columbus"];
var arrayOfTrainNames   = ["tain1","train2","train3","train4","train5","train6","train7"];
var timeStarted = new Date()
var arrayOfTrains = [];
var connectAS ="";
var train = {
	trainName:  "",
	destination: "",
	frequency:   0,
	nextArrival: "",
	minutesAway:  0
	};
function Train(name,desto,freq,nexto,minawat) {
	this.trainName = name;
	this.destination = desto;
	this.frequency = freq;
	this.nextArrival = "";
	this.minutesAway = minawat;
};
function clerk() {
  connectAs = "c";
  $("#buttons").remove();
  $("#status").text("connected as clerk");
  createTrains();
}
function administrator() {
  connectAs = "a";
  $("#buttons").remove();
  $("#status").text("connected as administrator");
  createTrains();

}
function createTrains() {
	minaway = generateMinutes()
	var t = new Train("cleveland","Erie",120,0,minaway);
	calculateArrivalTime();
	arrayOfTrains.push(t);
	for (j=0;j<arrayOfTrainNames.length;j++) {
	  var minAway = generateMinutes();
	  var t = new Train(arrayOfTrainNames[j],arrayOfDestinations[j],120,"30",minAway);
	  arrayOfTrains.push(t);
	  console.log("train name = " +arrayOfTrainNames[j]);
	  console.log("destination = " + arrayOfDestinations[j]);
	  console.log("frequency = " + 120);
	  console.log("nextArrival = " + arrayOfTrains[j].nextArrival);
	  console.log("minutesAway = " +arrayOfTrains[j].minutesAway);
	}
}
function generateMinutes() {
	return(25);
}
function calculateArrivalTime () {
	return(0);
}