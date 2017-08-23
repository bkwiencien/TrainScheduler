var connectAS ="";
var timeStarted = new Date()
var arrayOfTrains = [];
function clerk() {
  console.log("clerk");
  console.log(timeStarted);
  connectAs = "c";
  $("#buttons").remove();
  $("#status").text("connected as clerk");
}
function administrator() {
  console.log("administrator");
  console.log(timeStarted);
  connectAs = "a";
  $("#buttons").remove();
  $("#status").text("connected as administrator");

}