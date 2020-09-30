window.onload = () => (updateGeolocation());

function updateGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const json = fetchByCoords(latitude, longitude);
    json.then(result => putValues(result));
}

function error() {
    alert("Unable to retrieve your location; Loading default...");
    const json = fetchByCityName("Saint-Petersburg");
    json.then(result => putValues(result));
}

function fetchByCoords(latitude, longitude) {
    return fetch("https://community-open-weather-map.p.rapidapi.com/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=%2522%metric%2522%", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "fbeb764c8cmsh41ef6257dea778bp1f0d66jsnff3d118dc07a"
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}

function fetchByCityName(cityName) {

}


function putValues(json) {
    console.log(json);
    document.getElementById("main-location").innerText =
        json.name;
    document.getElementById("main-img").src =
        "img/" + json.weather[0].icon + ".png";
    document.getElementById("temperature").innerText =
        parseFloat(json.main.temp - 273.15).toFixed(0) + "°С";
    document.getElementById("wind").innerText =
        "Degree: " + json.wind.deg + "°, " + json.wind.speed + " m/s";
    document.getElementById("clouds").innerText =
        json.clouds.all + " %";
    document.getElementById("pressure").innerText =
        json.main.pressure + " hpa";
    document.getElementById("humidity").innerText =
        json.main.humidity + " %";
    document.getElementById("coordinates").innerText =
        "[" + json.coord.lat + ", " + json.coord.lon + "]";
}


function addCity(cityName) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("Four"));
    ul.appendChild(li);
}
