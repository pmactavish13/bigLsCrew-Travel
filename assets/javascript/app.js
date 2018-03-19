


var City = "Rome";
var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&APPID=beeeb0200ae49646011f7917db233044";
//API KEY:beeeb0200ae49646011f7917db233044
var results = undefined;
$.ajax({
    url:openWeatherQueryURL,
    method: "get"
}).then(function(response){
    results = response;
});