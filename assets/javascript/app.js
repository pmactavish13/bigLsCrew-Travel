
//API KEY:beeeb0200ae49646011f7917db233044
//var googleMapsAPI = "";/*<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC-gMBFX829n7IjoF8DIJMnBO77IQ8JgRc&callback=initMap'async defer></script>*/
//https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
//FozN4hA9DAjuptuej3UXIG5BT0mmLcrTx_LQEFyRUxSmJuGYe5Zic3os-8GGQPiv0TSfvxz6lkfxmyEvM0st4OFKA3kJE5bEMGQBpL8NuOlW-WXAWsOLO5ykfVCwWnYx

// var placesQueryURL ="https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + cityPlaceApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8";


// //google api key     AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8
        
//         $.ajax({
//           url: placesQueryURL,
//           method: "GET",
//         }).then(function (data) {
// // var place = response.results.name;
//             console.log(data);
// });
$(document).ready(function(){
console.log("name")
$("#submit-data").on("click", function(){
  
    cityPlaceApi = $("#destination").val().trim();
    console.log($("#destination").val().trim())
    $.ajax({
        url:"https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + cityPlaceApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8",
        method: "get"
    }).then(function(data){
        results = data;
        console.log(data);
        for(var i=0; i<4; i++){
            var restaurant11=data.results[i].name;
            var adress11=data.results[i].formatted_address;
            //  $("#rest-address").append("<div>" + restaurant11 + "</div>");
            //  $("#rest-address").append("<div>" + address11 + "</div>");
            console.log(restaurant11);
            console.log(adress11);
        }
         var restaurant1 = data.results[0].name;
         var address1 = data.results[0].formatted_address;
         //restaurant1.addClass('rest-name-class');
         //address1.addClass('rest-address-class');
         $("#rest-address").append("<div>" + restaurant1 + "</div>");
         $("#rest-address").append("<div>" + address1 + "</div>");
         //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
       
          var restaurant2 = data.results[1].name;
          var address2 = data.results[1].formatted_address;
         // restaurant2.addClass('rest-name-class');
         //address2.addClass('rest-address-class');
          $("#rest-address").append("<div>" + restaurant2 + "</div>");
          $("#rest-address").append("<div>" + address2 + "</div>");

          var restaurant3 = data.results[2].name;
          var address3 = data.results[2].formatted_address;
         // restaurant3.addClass('rest-name-class');
         //address3.addClass('rest-address-class');
         $("#rest-address").append("<div>" + restaurant3 + "</div>")
         $("#rest-address").append("<div>" + address3 + "</div>")
         //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")

         var restaurant4 = data.results[3].name;
         var address4 = data.results[3].formatted_address;
        // restaurant4.addClass('rest-name-class');
        //address4.addClass('rest-address-class');
        $("#rest-address").append("<div>" + restaurant4 + "</div>")
        $("#rest-address").append("<div>" + address4 + "</div>")
        //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
    });
});
//search?source=hp&ei=MG22WvH-LMbm_QbgjqDYDw&q=health+information+in+philadelphia&oq=health+information+in+philadelphia&gs_l=psy-ab.3..33i22i29i30k1l4.1719.7120.0.7301.36.29.0.6.6.0.154.1935.24j4.29.0....0...1c.1.64.psy-ab..1.35.2001.6..0j35i39k1j0i131k1j0i67k1j0i131i67k1j0i20i263k1j0i22i30k1j0i8i13i30k1.48.ygbpj7BRdQY
$("#submit-data").on("click", function(){
    cityHealthApi = $("#destination").val().trim();
    console.log($("#destination").val().trim())
    $.ajax({
        url:"https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=health+information+in+" + cityHealthApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8",
        method: "get"
    }).then(function(responseCityHealth){
        results = responseCityHealth;
        console.log(responseCityHealth);
        //$("#restaurant").html("<div>" + response.results[0].name + "</div>")
        //$("#restaurant").append("<div>" + response.results[0].formatted_address + "</div>")
        //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
    });
});
});

//API KEY:beeeb0200ae49646011f7917db233044
//var googleMapsAPI = "";/*<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC-gMBFX829n7IjoF8DIJMnBO77IQ8JgRc&callback=initMap'async defer></script>*/
//https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
//FozN4hA9DAjuptuej3UXIG5BT0mmLcrTx_LQEFyRUxSmJuGYe5Zic3os-8GGQPiv0TSfvxz6lkfxmyEvM0st4OFKA3kJE5bEMGQBpL8NuOlW-WXAWsOLO5ykfVCwWnYx

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDZvgtMtB6eoQymC3arARneZq557FGTsC0",
        authDomain: "travelproj-2dc6d.firebaseapp.com",
        databaseURL: "https://travelproj-2dc6d.firebaseio.com",
        projectId: "travelproj-2dc6d",
        storageBucket: "travelproj-2dc6d.appspot.com",
        messagingSenderId: "625003623246"
    };
    firebase.initializeApp(config);

//UGLY URL VARIABLES//
//var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=beeeb0200ae49646011f7917db233044";
var googleMapsTimeZoneQueryURL = "https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyACzWLfVVhDTJc2ivhNQio_LjbUrLfYViU";
var googleCustomSearchAPIKey = "AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus";
var googleCustomSearchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus&cx=017576662512468239146:omuauf_lfve&q=lectures";
//--------------------------YUCK--------------------------------------------------------->

//actual variables
//UGLY URL VARIABLES//
//var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=beeeb0200ae49646011f7917db233044";

//var googleCustomSearchAPIKey = "AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus";
//var googleCustomSearchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAod0vUH_7hewxjW_4HPxbZbeB0TzEbPus&cx=017576662512468239146:omuauf_lfve&q=lectures";

/*
            $.ajax({
                url:"https://tools.cdc.gov/api/v2/resources/media?topicids=6241",
                method: "get"
            }).then(function(response){
               results = response;
               console.log(results);
               //ID:6240
            });
*/
//--------------------------YUCK--------------------------------------------------------->
//IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! IGNORE ME! 


 // Initialize Firebase

 //IDs NEEDED: "map", "submit-data", "weather", "destination"

var city = "Rome, Italy";
var results = undefined;
var coord = {lat: 0 , lng: 0 };
var dateAndTime = "";





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

    $("#submit-data").on("click", function(event){
        event.preventDefault();
        city = $("#destination").val().trim();
        console.log(city);
        //console.log($("#destination").val().trim())
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
            $("#weather").html("<p>" + response.main.temp + "</p>")
        });

        $.ajax({
            url:googleMapsTimeZoneQueryURL,
            method: "get"
        }).then(function(response){
            results = response;
            console.log(response);
        });
            $("#weather").append("<p>" + response.main.temp + "ºF</p>")
            timeZone();
        });
        

        //TIMEZONEDB
        function timeZone(){
            $.ajax({
                url:"https://api.timezonedb.com/v2/get-time-zone?key=GDN58Z4BNM7G&format=json&by=position&lat=" + coord.lat + "&lng=" + coord.lng,
                method: "get"
            }).then(function(response){
                results = response;
                console.log(response);
                //v2/resources/media/console.log(response);
                var foreignTime = moment(response.formatted);
                console.log(foreignTime.format("HH:mm MM/DD/YYYY"));
                dateAndTime = foreignTime.format("HH:mm MM/DD/YYYY");
                $("#weather").append("<p>" + dateAndTime + "</p>");
            });

        }
        //https://cors-anywhere.herokuapp.com
    });
