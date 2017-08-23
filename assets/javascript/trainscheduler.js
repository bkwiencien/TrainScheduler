var connectAS ="";
var train = {
	trainName:  "",
	destination: "",
	frequency:   0,
	nextArrival: "",
	minutesAway:  0
	};
function Train(name,desto,freq) {
	this.trainName = name;
	this.destination = desto;
	this.frequency = freq;
};
var timeStarted = new Date()
var arrayOfTrains = [];
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
	var t = new Train("cleveland","Erie",120);
	arrayOfTrains.push(t);
	console.log(arrayOfTrains.length);
	console.log(arrayOfTrains[0].trainName);
	console.log(arrayOfTrains[0].destination);


}