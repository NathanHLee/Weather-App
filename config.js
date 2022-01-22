// Create the URL for openWeatherMap
// 'BASE_URL' is the base URL that is always constant
// 'SECRET_KEY' is my special API code that lets the database
//      know who is requesting permission
const constants = {
    openWeatherMap: {
        BASE_URL: 'https://api.openweathermap.org/data/2.5/weather?q=',
        SECRET_KEY: '1b0c258046cf6357e630d9d201bdd42f'
    }
}

// Send the function 'constants' whenever config.js is called
 module.exports = constants;