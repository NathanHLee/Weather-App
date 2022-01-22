var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date')

// Create a list of all the months
const monthNames = ["January","February","March","April","May","June","July",
                    "August","September","October","November","December"]

// Return the month as a 3 letter string
dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    const locationApi = fetchWeather + "?address=" + search.value;

    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            }
            else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } 
                else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = ((data.temperature - 273.5) * (9 / 5) + 32).toFixed(0) + String.fromCharCode(176) + String.fromCharCode(70);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    });
})