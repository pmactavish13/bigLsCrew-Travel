
//API KEY:beeeb0200ae49646011f7917db233044
//var googleMapsAPI = "";/*<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC-gMBFX829n7IjoF8DIJMnBO77IQ8JgRc&callback=initMap'async defer></script>*/
//https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
//FozN4hA9DAjuptuej3UXIG5BT0mmLcrTx_LQEFyRUxSmJuGYe5Zic3os-8GGQPiv0TSfvxz6lkfxmyEvM0st4OFKA3kJE5bEMGQBpL8NuOlW-WXAWsOLO5ykfVCwWnYx

//UGLY URL VARIABLES//
//var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=beeeb0200ae49646011f7917db233044";

//var googleCustomSearchAPIKey = "AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus";
//var googleCustomSearchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus&cx=017576662512468239146:omuauf_lfve&q=lectures";
//--------------------------YUCK--------------------------------------------------------->


    // Initialize Firebase

var config = {
    apiKey: "AIzaSyDZvgtMtB6eoQymC3arARneZq557FGTsC0",
    authDomain: "travelproj-2dc6d.firebaseapp.com",
    databaseURL: "https://travelproj-2dc6d.firebaseio.com",
    projectId: "travelproj-2dc6d",
    storageBucket: "travelproj-2dc6d.appspot.com",
    messagingSenderId: "625003623246"
};


var city = "Rome, Italy";
var results = undefined;
var coord = {lat: 0 , lng: 0 };
var dateAndTime = "";

firebase.initializeApp(config);



function initMap(coord) {
    var uluru = coord;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

$(document).ready(function(){





    $("#submit-data").on("click", function(){
        city = $("#destination").val().trim();
        console.log($("#destination").val().trim())
        $("#weather").empty();
        //OPEN WEATHER API
        $.ajax({
            url:"https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=beeeb0200ae49646011f7917db233044",
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
            $("#weather").append("<p>" + response.main.temp + "ºF</p>")
            timeZone();
        });
        

        //TIMEZONEDB
        function timeZone(){
            $.ajax({
                url:"http://api.timezonedb.com/v2/get-time-zone?key=GDN58Z4BNM7G&format=json&by=position&lat=" + coord.lat + "&lng=" + coord.lng,
                method: "get"
            }).then(function(response){
                results = response;
                //console.log(response);
                var foreignTime = moment(response.formatted);
                console.log(foreignTime.format("HH:mm MM/DD/YYYY"));
                dateAndTime = foreignTime.format("HH:mm MM/DD/YYYY");
                $("#weather").append("<p>" + dateAndTime + "</p>");
            });
        }

        //
    });

});