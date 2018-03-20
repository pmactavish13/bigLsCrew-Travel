
//API KEY:beeeb0200ae49646011f7917db233044
//var googleMapsAPI = "";/*<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC-gMBFX829n7IjoF8DIJMnBO77IQ8JgRc&callback=initMap'async defer></script>*/
//https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
//FozN4hA9DAjuptuej3UXIG5BT0mmLcrTx_LQEFyRUxSmJuGYe5Zic3os-8GGQPiv0TSfvxz6lkfxmyEvM0st4OFKA3kJE5bEMGQBpL8NuOlW-WXAWsOLO5ykfVCwWnYx

//UGLY URL VARIABLES//
//var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&APPID=beeeb0200ae49646011f7917db233044";
var googleMapsTimeZoneQueryURL = "https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyACzWLfVVhDTJc2ivhNQio_LjbUrLfYViU";
var googleCustomSearchAPIKey = "AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus";
var googleCustomSearchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus&cx=017576662512468239146:omuauf_lfve&q=lectures";
//--------------------------YUCK--------------------------------------------------------->

//actual variables

var City = "Rome";
var results = undefined;
var coord = {lat: 0 , lng: 0 };





function initMap(coord) {
    var uluru = coord;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

$(document).ready(function(){


$.ajax({
    url:"https://api.openweathermap.org/data/2.5/weather?q=" + City + "&units=imperial&APPID=beeeb0200ae49646011f7917db233044",
    method: "get"
}).then(function(response){
    results = response;
    console.log(response);
    console.log(response.name);
    console.log(response.main.temp);
    coord.lat = response.coord.lat;
    coord.lng = response.coord.lon;
    //coords
    initMap(coord);
    $("#weather").html("<p>" + response.main.temp + "</p>")
});

$.ajax({
    url:googleMapsTimeZoneQueryURL,
    method: "get"
}).then(function(response){
    results = response;
    console.log(response);
});

    //initMap(coord);
});