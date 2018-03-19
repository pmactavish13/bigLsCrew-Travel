


var City = "London";
var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&APPID=beeeb0200ae49646011f7917db233044";

//API KEY:beeeb0200ae49646011f7917db233044
var googleMapsTimeZoneQueryURL = "https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyACzWLfVVhDTJc2ivhNQio_LjbUrLfYViU"

var googleMapsAPI = "AIzaSyC-gMBFX829n7IjoF8DIJMnBO77IQ8JgRc"

var results = undefined;
$.ajax({
    url:openWeatherQueryURL,
    method: "get"
}).then(function(response){
    results = response;
    console.log(response.name);
    console.log(response.main.temp);
});

$.ajax({
    url:googleMapsTimeZoneQueryURL,
    method: "get"
}).then(function(response){
    results = response;
    console.log(response);
});

