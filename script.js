window.onload = () => {
    updateWeather();
    loadCitiesFromStorage();
};

/* const fetchoutput = {
    clouds: {all: 90},
    coord: {lon: 30.37, lat: 59.92},
    main: {temp: 286.16, pressure: 1015, humidity: 93},
    weather: [
        {id: 804, main: "Clouds", description: "overcast clouds", icon: "04n"}
        ],
    name: "Smolenskoye",
    wind: {speed: 2, deg: 120},
    cod: 200
} */


function updateWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    PostMainCityWeather(data, "position");
}

function PostMainCityWeather(data, type) {

    const loader = getLoader();
    const mainCitySection = document.getElementById("main-city-section")
    if (mainCitySection.firstElementChild) {
        mainCitySection.removeChild(mainCitySection.firstElementChild);
        mainCitySection.removeChild(mainCitySection.firstElementChild);
    }
    mainCitySection.appendChild(loader);

    let weatherData;
    switch (type) {
        case 'position':
            weatherData = fetchByCoords(data.latitude, data.longitude);
            break;
        case 'cityName':
            weatherData = fetchByCityName(data);
            break;
    }
    weatherData.then((result) => {
        //loader.id = result.id + "loader";
        const template = getTemplate(result, "main-");
       // document.getElementById(loader.id).remove();
        mainCitySection.getElementsByClassName("loader")[0].remove();
        mainCitySection.appendChild(template)
    })
}

function error() {
    alert("Unable to retrieve your location; Loading default...");
    PostMainCityWeather("Saint-Petersburg", "cityName");
}

function fetchByCoords(latitude, longitude) {
    return fetch("https://community-open-weather-map.p.rapidapi.com/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=%22metric%22", {
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
    const parameterName = cityName
        .replaceAll("-", " ")
        .replaceAll(" ", "%20");
    return fetch("https://community-open-weather-map.p.rapidapi.com/weather?units=%2522metric%2522&q=" +
        parameterName, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "fbeb764c8cmsh41ef6257dea778bp1f0d66jsnff3d118dc07a"
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}

function getTemplate(json, prefix) {

    console.log(json);

    const temp = document.getElementById(prefix + "city").content;
    const copytemp = document.importNode(temp, true);

    copytemp.getElementById(prefix + "location").innerText = json.name;
    copytemp.getElementById(prefix + "img").src =
        "img/" + json.weather[0].icon + ".png";
    copytemp.getElementById(prefix + "temperature").innerText =
        parseFloat(json.main.temp - 273.15).toFixed(0) + "°С";
    copytemp.getElementById(prefix + "wind").innerText =
        "Degree: " + json.wind.deg + "°, " + json.wind.speed + " m/s";
    copytemp.getElementById(prefix + "clouds").innerText =
        json.clouds.all + " %";
    copytemp.getElementById(prefix + "pressure").innerText =
        json.main.pressure + " hpa";
    copytemp.getElementById(prefix + "humidity").innerText =
        json.main.humidity + " %";
    copytemp.getElementById(prefix + "coords").innerText =
        "[" + json.coord.lat + ", " + json.coord.lon + "]";

    if (prefix === "fav-") {
        copytemp.getElementById("close-btn").value = json.id;
        copytemp.getElementById("start").id = json.id;
    }

    return copytemp;
}

function addCity() {
    const cityName = document.getElementById("form-city-name").value;
    PostCityWeather(cityName);
}

function loadCitiesFromStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        PostCityWeather(localStorage.getItem(key));
    }
}

function PostCityWeather(cityName) {

    const loader = getLoader();
    const ol = document.getElementById("cities");
    ol.appendChild(loader);

    const weatherData = fetchByCityName(cityName)
        .then((result) => {
            if (result.cod == 404 || result.cod == 400) {
                alert("City was not found");
                ol.getElementsByClassName("loader")[0].remove();
                return;
            }
            if (!localStorage[result.id]) {
                localStorage.setItem(result.id, cityName);
            }
            //loader.id = result.id + "loader";
            const template = getTemplate(result, "fav-");
            //document.getElementById(loader.id).remove();
            ol.getElementsByClassName("loader")[0].remove();
            ol.appendChild(template);
        })
}

function removeCity(cityId) {
    localStorage.removeItem(cityId);
    document.getElementById(cityId).remove();

}

function getLoader() {
    const loader = document.getElementById("loader").content;
    const loaderCopy = document.importNode(loader, true);
    return loaderCopy;
}