//GLOBAL VARIABLES
var destination;
var city;
var country;
var cityLower;
var numSearchedCounter;
var recentSearches = 0;
var cityExists = false
var numSearched = 1
var results = undefined;
var coord = { lat: 0, lng: 0 };
var dateAndTime = "";


//FUNCTIONS

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBNsIe37RELMNqecsYHHWmmhcw59jQkf88",
    authDomain: "practicaltravel-63ff1.firebaseapp.com",
    databaseURL: "https://practicaltravel-63ff1.firebaseio.com",
    projectId: "practicaltravel-63ff1",
    storageBucket: "practicaltravel-63ff1.appspot.com",
    messagingSenderId: "600055377899"
};

// set a reference to the database service
firebase.initializeApp(config);
var database = firebase.database();

//Weather and Coordinates

function tempAndCoord() {
    destination = $("#destination").val().trim();
    //make sure there's a comma in there
    if (destination.includes(",") === false) {
        alertify.error("wrong format");
    }
    var destArr = destination.split(",");
    city = destArr[0].trim();
    country = destArr[1].trim();
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + destination + "&units=imperial&APPID=beeeb0200ae49646011f7917db233044",
        method: "get"
    }).then(function (response) {
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
}


//FLICKR IMAGES SEARCH FUNCTION 

function flickrSlideshow() {
    $("#slides").empty();
    $(function() {
    //get JSON
    var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    $.getJSON(flickrAPI, {
        tags: "architecture, " + city + " ,sights",
        tagmode: "all",
        format: "json",
        extras: "url_l"
    }).done(function(data) {
        console.log(data);
        $.each(data.items, function(index, item) {
            console.log(item);
            $("<img height=350px width= 350px>").attr("src", item.media.m).appendTo("#slides");
           
            if (index ==9) {
                return false;
            }
            slidesJS()    
        });
    }).fail(function() {
        alert("Ajax call failed.");
    });

    });
}

function slidesJS() {
    function slideJS() {
        $(function() {
            $("#slides").slidesjs({
                width: 350,
                height: 350,
                play: {
                    active: true,
                    auto: true,
                    interval: 4000,
                    swap: true
                },  
            });
        });
    };
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

function googleSearchRest() {
    cityPlaceApi = $("#destination").val().trim();
    console.log($("#destination").val().trim())
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + cityPlaceApi + "&key=AIzaSyBHOtkHIyowW6axP4vdTXKYOKGpv2k2IM8",
        method: "get"
    }).then(function (data) {
        results = data;
        console.log(data);
        for (var i = 0; i < 4; i++) {
            var restaurant11 = data.results[i].name;
            var adress11 = data.results[i].formatted_address;
            //  $("#rest-address").append("<div>" + restaurant11 + "</div>");
            //  $("#rest-address").append("<div>" + address11 + "</div>");
            console.log(restaurant11);
            console.log(adress11);
        }
        var $restaurant1 = data.results[0].name;
        var $address1 = data.results[0].formatted_address;
        //$restaurant1.addClass('rest-name-class');
        //address1.addClass('rest-address-class');
        $("#rest-name1").text($restaurant1);
        $("#rest-address1").text($address1);
        //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")

        var restaurant2 = data.results[1].name;
        var address2 = data.results[1].formatted_address;
        // restaurant2.addClass('rest-name-class');
        // address2.addClass('rest-address-class');
        $("#rest-name2").text(restaurant2);
        $("#rest-address2").text(address2);

        var restaurant3 = data.results[2].name;
        var address3 = data.results[2].formatted_address;
        // restaurant3.addClass('rest-name-class');
        //address3.addClass('rest-address-class');
        $("#rest-name3").text(restaurant3)
        $("#rest-address3").text(address3)
        //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")

        var restaurant4 = data.results[3].name;
        var address4 = data.results[3].formatted_address;
        //restaurant4.addClass('rest-name-class');
        //address4.addClass('rest-address-class');
        $("#rest-name4").text(restaurant4)
        $("#rest-address4").text(address4)
        //$("#restaurant").append("<div>" + response.results[0].photos[0].photo_reference + "</div>")
    });
}

//GOOGLE SEARCH HEALTH FUNCTION 

function googleSearchHealth() {
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

// DATABASE FUNCTION
function travelDatabase() {
    // Capture User Inputs and store them into variables
    var destination = $("#destination").val().trim();
    var destArr = destination.split(",");
    city = destArr[0].trim();
    country = destArr[1].trim();
    cityLower = city.toLowerCase();
    database.ref('travelPlans').limitToFirst(1).once('value', function (snapshot) {
        // if data exists
        if (snapshot.exists()) {
            ifExists();;
        } else {
            updateDatabase();
        }
    });

};

// DATABASE FUNCTION
// Check to see if city exists
function ifExists() {
    var cityRef = firebase.database().ref('travelPlans');
    cityRef.once('value', function (citySnapshot) {
        var myJSON = JSON.stringify(citySnapshot);
        var entrySearch = JSON.parse(myJSON);
        var length = (Object.keys(entrySearch).length);
        var entriesSearched = 1
        citySnapshot.forEach(function (snapshot) {
            cityExists = false;
            if (snapshot.val().city == cityLower) {
                cityExists = true
                var myJSON = JSON.stringify(snapshot);
                var citySearch = JSON.parse(myJSON);
                var dataKey = snapshot.key;
                numSearchedCounter = (citySearch.numSearched);
                numSearchedCounter++;
                firebase.database().ref("travelPlans")
                    .child(dataKey).child('numSearched')
                    .set(numSearchedCounter);
            }
            if ((entriesSearched == length) && (cityExists == false)) {
                updateDatabase()
            }
            if ((entriesSearched == length) && (cityExists == true)) {
                var cityExists = 'false'
                updateScreen()
            }
            if ((entriesSearched !== length) && (cityExists == true)) {
                entriesSearched++
            } else {
                entriesSearched++
            }
        });
    });
}

// DATABASE FUNCTION
// add new search parameters to database
function updateDatabase() {
    database.ref('travelPlans').push({
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        city: cityLower,
        country: country,
        numSearched: 1,
    });
    updateScreen();
};

// DATABASE FUNCTION
//update the screen - clear search parameters, update recent and most popular
function updateScreen() {
    // Clear the input boxes on the screen and replace with placer text
    $("#destination").val("City, Country");
    $("#popular-searches").empty();
    // Update popular and recent searches

    recentSearches++;
    var recentCity = "<h5 class='recent-city'>" + city + "</h5>";
    if (recentSearches > 3) {
        $(".recent-city h5:last-child").remove()
    }
    $("#recent-searches").prepend(recentCity);

    var numRef = firebase.database().ref('travelPlans');
    //numRef.once('value', function (numSnapshot) {
    //var ref = db.ref("dinosaurs");
    numRef.orderByChild("numSearched").limitToLast(3).on("child_added", function (snapshot) {
        var popular = snapshot.val().city
        var popularCity = "<h5 class='popular-city'>" + popular + "</h5>";
        $("#popular-searches").append(popularCity);
    });
}

$(document).ready(function () {
    
    $('#submit-data').on('click', function (event) {
        event.preventDefault();

        //OPEN WEATHER API
        tempAndCoord();

        //GOOGLE SEARCH API CALL
        googleSearchRest();
        //GOOGLE HEALTH SEARCH API CALL
        googleSearchHealth();

        //FIREBASE 
        travelDatabase();
        // reset search counters for each new input
        numSearched = 1;
        numSearchedCounter = 1;

        // Flickr with slidesjs
        flickrSlideshow();

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
