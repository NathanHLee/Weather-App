// Move back a directory to open a specific folder
const request = require('request');
const constants = require('../config');

// 'weatherData' will call back to the app.js file in src to apply
//      the correct API so the user can see which city they searched
const weatherData = (address, callback) => 
{
    // We gather the URL and format it so the program knows which
    //      location to search in the API and return a Json file
    // We encode the address for proper purposes to keep information safe
    // URL: BASE_URL + location + &appid= + SECRET_KEY
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    // Check if the Json is avaliable
    request({url, json:true}, (error, {body}) => {
        // If you cannot find the Json
        if(error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } 
        // If a section of data is missing from the Json, or misspelled a city
        else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location", undefined);
        } 
        else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

// Send the function 'constants' whenever weatherData.js is called
module.exports = weatherData;