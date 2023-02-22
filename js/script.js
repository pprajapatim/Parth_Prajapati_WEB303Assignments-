/*
    Assignment #4
    Parth Prajapati
*/

$(function () {

    // check if geolocation is allowed by the user
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {

        // get the current location
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        // display the current location on the page
        $("#locationhere").text("Your current location is: " + lat + ", " + lon);

        // check if a location value is stored in localstorage
        var storedLoc = localStorage.getItem("location");
        
        if (storedLoc) {
            // convert the stored location from a string to an array of numbers
            storedLoc = storedLoc.split(",").map(Number);
            // calculate the distance between the stored location and the current location
            var dist = calcDistanceBetweenPoints(storedLoc[0], storedLoc[1], lat, lon);
            // display the distance to the user
            var distKm = dist / 1000; // convert meters to kilometers
            $("<p>").text("You traveled" + distKm.toFixed(2) + " km since your last visit.").insertAfter("#locationhere");
            // display a welcome message to returning visitors
            $("<h2>").text("Welcome back ").insertBefore("#locationhere");
            // display the stored location on the page
            $("<p>").text("Your last location was: " + storedLoc[0] + ", " + storedLoc[1]).insertAfter("#locationhere");
        
        } else {

            // display a welcome message to new visitors
            $("<h2>").text("Welcome ").insertBefore("#locationhere");
        }

        // store the current location in localstorage
        localStorage.setItem("location", lat + "," + lon);
        }, function (error) {

        // geolocation was blocked or unavailable, display an error message to the user
        $("<p>").text("Error: Geolocation is not enabled or could not get your location.").insertAfter("#locationhere");

        }, { enableHighAccuracy: true });
        
    } else {
        // geolocation not supported, display an error message to the user
        $("<p>").text("Error: Geolocation is not supported by your browser.").insertAfter("#locationhere");
    }

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


