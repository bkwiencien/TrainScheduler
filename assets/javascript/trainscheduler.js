var arrayOfTrains = [];
var arrayOfDestinations = ["Cleveland","chicago","Dallas","san Francisco","Indianapolis","Columbus","hartford"];
var arrayOfTrainNames   = ["train1","train2","train3","train4","train5","train6","train7"];
var timeStarted = new Date()
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
	var currentDate = new Date();
	for (j=0;j<arrayOfTrainNames.length;j++) {
	  var minAway = generateMinutes();
	  var ariveAt = calculateArrivalTime(minAway);	
	  var freq = generateFrequence();
	  var t = new Train(arrayOfTrainNames[j],arrayOfDestinations[j],freq,"",minAway);
	  arrayOfTrains.push(t);
    }
function generateMinutes() {
	var tempnum = Math.round(Math.random()*100);
	return(tempnum);
}
function calculateArrivalTime (aw) {
	//var d = (new Date() + aw*1000);
	var dd = new Date();
	console.log("right now it is "+ dd);
	var arrivalDate = addMinutes(dd,aw);
	console.log("will arrive at "+ arrivalDate);
	return(" ");
}
function generateFrequence () {
	var tempnum = Math.round(Math.random()*1000);
	if (tempnum <20) {
		tempnum = 20;
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