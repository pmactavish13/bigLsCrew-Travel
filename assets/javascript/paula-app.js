// GLOBAL VARIABLES


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
// ***********************************************
// I left the bottom tags so you could see where it went
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