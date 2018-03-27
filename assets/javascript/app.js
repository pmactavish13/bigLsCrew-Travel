//GLOBAL VARIABLES
var destination;
var city;
var country;


var numSearched = 1
var results = undefined;
var coord = { lat: 0, lng: 0 };
var dateAndTime = "";


//FUNCTIONS

//Weather and Coordinates

function tempAndCoord(){
    destination = $("#destination").val().trim();
    //make sure there's a comma in there
    if(destination.includes(",") === false){
        alertify.error("wrong format");
    }
    var destArr = destination.split(",");
    city = destArr[0].trim();
    country = destArr[1].trim();
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?q=" + destination + "&units=imperial&APPID=beeeb0200ae49646011f7917db233044",
        method: "get"
    }).then(function(response){
        results = response;
        console.log(response);
        console.log(response.name);
        console.log("temp: " + response.main.temp + "degrees");
        console.log("humidity: " + response.main.humidity + " %");
        console.log("weather: " + response.weather[0].description);
        coord.lat = response.coord.lat;
        coord.lng = response.coord.lon;
        //coords
        initMap(coord);
        $("#current-temp").text(response.main.temp + "ºF")
        timeZone();
    });

}


//GOOGLE MAP API FUNCTION
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
    
    console.log(map);
}


//GETTY IMAGES SEARCH FUNCTION 

function gettySearch() {
    var apiKey = 'apiKey';
    $.ajax(
        {
            type: 'GET',
            url: "https://api.gettyimages.com/v3/search/images/creative?phrase=" + destination,
            beforeSend: function (request) {
                request.setRequestHeader("Api-Key", apiKey);
            }
        })
        .done(function (data) {
            console.log("Success with data")
            for (var i = 0; i < data.images.length; i++) {
                $(".slideshow").append("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
            }
        })
        .fail(function (data) {
            alert(JSON.stringify(data, 2))
        });
    return false;
}

//TIMEZONE DB FUNCTIONf
    function timeZone() {
        $.ajax({
            url: "https://api.timezonedb.com/v2/get-time-zone?key=GDN58Z4BNM7G&format=json&by=position&lat=" + coord.lat + "&lng=" + coord.lng,
            method: "get"
        }).then(function (response) {
            results = response;
            console.log(response);
            //v2/resources/media/console.log(response);
            var foreignTime = moment(response.formatted);
            console.log(foreignTime.format("HH:mm MM/DD/YYYY"));
            console.log(foreignTime.format("hh:mm a MM/DD/YYYY"));
            dateAndTime = foreignTime.format("HH:mm  MM/DD/YYYY ");
            var standard;
            $("#timezone").text(dateAndTime);
        });
    }

//GOOGLE SEARCH RESTAURANT FUNCTION

function googleSearchRest(){
    cityPlaceApi = $("#destination").val().trim();
    console.log($("#destination").val().trim())
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + cityPlaceApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8",
        method: "get"
    }).then(function (data) {
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
         var $restaurant1 = data.results[0].name;
         var $address1 = data.results[0].formatted_address;
         //$restaurant1.addClass('rest-name-class');
         //address1.addClass('rest-address-class');
         $("#rest-name1").text($restaurant1  );
         $("#rest-address1").text($address1 );
         //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
       
          var restaurant2 = data.results[1].name;
          var address2 = data.results[1].formatted_address;
         // restaurant2.addClass('rest-name-class');
        // address2.addClass('rest-address-class');
          $("#rest-name2").text( restaurant2 );
          $("#rest-address2").text(address2 );

          var restaurant3 = data.results[2].name;
          var address3 = data.results[2].formatted_address;
         // restaurant3.addClass('rest-name-class');
         //address3.addClass('rest-address-class');
         $("#rest-name3").text( restaurant3 )
         $("#rest-address3").text(address3 )
         //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")

         var restaurant4 = data.results[3].name;
         var address4 = data.results[3].formatted_address;
         //restaurant4.addClass('rest-name-class');
        //address4.addClass('rest-address-class');
        $("#rest-name4").text( restaurant4 )
        $("#rest-address4").text( address4 )
        //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
    });
}

//GOOGLE SEARCH HEALTH FUNCTION 

function googleSearchHealth(){
    cityHealthApi = $("#destination").val().trim();
    console.log($("#destination").val().trim())
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=health+news+in+" + cityHealthApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8",
        method: "get"
    }).then(function (responseCityHealth) {
        results = responseCityHealth;
        console.log(responseCityHealth);
        //$("#restaurant").html("<div>" + response.results[0].name + "</div>")
        //$("#restaurant").append("<div>" + response.results[0].formatted_address + "</div>")
        //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
    });
}



$(document).ready(function () {
    var apiKeyGetty = 'zd7c8j455yjfnjcmxvnhrdn8';
    var gettyURL = "'https://api.gettyimages.com/v3/search/images?"

    /*// Initialize Firebase
    var config = {
        apiKey: "AIzaSyBNsIe37RELMNqecsYHHWmmhcw59jQkf88",
        authDomain: "practicaltravel-63ff1.firebaseapp.com",
        databaseURL: "https://practicaltravel-63ff1.firebaseio.com",
        projectId: "practicaltravel-63ff1",
        storageBucket: "",
        messagingSenderId: "600055377899"
    };

    var database = firebase.database();
    // set a reference to the database service
    firebase.initializeApp(config);
    */

    $('#submit-data').on('click', function (event) {
        event.preventDefault();
        
        //OPEN WEATHER API
        tempAndCoord();           

        //GOOGLE SEARCH API CALL
        googleSearchRest();
        //GOOGLE HEALTH SEARCH API CALL
        googleSearchHealth();

        //gettySearch();


    });
    
});





    // slideshow
    // $('.single-item-rtl').slick({
    //     rtl: true
    //   });

    // $(document).ready(function () {
    //     $('.slider-for').slick({
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         arrows: false,
    //         fade: true,
    //         asNavFor: '.slider-nav'
    //     });
    // });



        //GETTY IMAGES API CALL
        /*
        $.ajax({
            type: 'GET',
            url: "https://api.gettyimages.com/v3/search/images?fields=allowed_use,referral_destinations,keywords&sort_order=best&phrase=London",
            beforeSend: function (request) {
                request.setRequestHeader("Api-Key", apiKey);
            }
        })
            .done(function (data) {
                console.log(data)
                for (var i = 0; i < 10; i++) {
                    $(".slideshow").append("<img src='" + data.images[i].display_sizes[i].keyword.uri + "'/>");
                }
            })
            .fail(function (data) {
                alert(JSON.stringify(data, 2))

            });




    // slideshow
    // $('.single-item-rtl').slick({
    //     rtl: true
    //   });

    // $(document).ready(function () {
    //     $('.slider-for').slick({
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         arrows: false,
    //         fade: true,
    //         asNavFor: '.slider-nav'
    //     });
    // });
        */
