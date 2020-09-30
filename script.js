function updateGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    showPosition(position);

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch("https://community-open-weather-map.p.rapidapi.com/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&callback=test&units=%2522metric%2522%", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "fbeb764c8cmsh41ef6257dea778bp1f0d66jsnff3d118dc07a"
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
}

function error() {
    alert("Unable to retrieve your location");
}

function showPosition(position) {
    alert("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
}