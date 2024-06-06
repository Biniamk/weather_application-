"use strict";

window.onload = () => {
    let citiesDropdown = document.querySelector("#selectCitiesDropdown");
    citiesDropdown.addEventListener("change", () => {
        if(citiesDropdown.value === ""){
            hideTable();
        }else {
            getWeatherDataForLocation(citiesDropdown.value);
        }
        
    });
    inputCitiesData();
}
let cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "Denver, CO", latitude: 39.712179, longitude: -104.973050 },
    { name: "Portland, OR", latitude: 45.520117, longitude: -122.676683 },
    { name: "Portland, ME", latitude: 43.662093, longitude: -70.260251 },
    { name: "Mesquite, TX", latitude: 32.76874, longitude: -96.59768 },
    { name: "Gallup, N.Mex", latitude: 35.55943, longitude: -108.73341 },
    { name: "Modesto, Calif", latitude: 43.662093, longitude: -70.260251 },
    { name: "McGill, NV", latitude: 39.40500, longitude: -114.77733 },
    { name: "Beaver, UT", latitude: 38.27736, longitude: -112.64027 },
    { name: "Springfield, Mo", latitude: 37.20632, longitude: -93.28860 },
    { name: "Baton Rouge, La", latitude: 30.45065, longitude: -91.16738 },
    { name: "Paris, TX", latitude: 33.65983, longitude: -95.55487 }
 ];

function inputCitiesData() {
    let citiesData = document.querySelector("#selectCitiesDropdown");


    citiesData.innerHTML = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select A City";
    citiesData.appendChild(defaultOption);

    cities.forEach(city => {
        let newOption = document.createElement("option");
        newOption.value = `${city.latitude},${city.longitude}`;
        newOption.textContent = city.name;
        citiesData.appendChild(newOption);
    });
}

function getWeatherDataForLocation(location) {
    fetch(`https://api.weather.gov/points/${location}`)
        .then((response) => response.json())
        .then((weatherData) => {
            getForecastDetails(weatherData.properties.forecast);
        });
}

function getForecastDetails(forecastURL) {
    fetch(forecastURL)
        .then((response) => response.json())
        .then((data) => {
            generateTableRows(data.properties.periods);
        });
}

function hideTable(){
    let tableOverall = document.querySelector("#tableOverall");
    tableOverall.style.display = "none";
}



function generateTableRows(periods) {
    let tbody = document.querySelector("#userTableInfo");
    tbody.innerHTML = ""; 

    let tableOverall = document.querySelector("#tableOverall");
    tableOverall.style.display = "block"


    periods.forEach(period => {
        let row = tbody.insertRow();
        let cell1 = row.insertCell();
        cell1.textContent = period.name;

        let cell2 = row.insertCell();
        cell2.textContent = `Temperture ${period.temperature} F - Winds ${period.windSpeed} - ${period.windDirection}`;

        let cell3 = row.insertCell();
        cell3.textContent = period.shortForecast;
    });
}
