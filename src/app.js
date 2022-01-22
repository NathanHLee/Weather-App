// 'const' are blocked scoped. These values cannot be changed
//      through reassignment or redeclared. i.e. not a global 
//      variable
const express = require('express');
// 'hbs' stands for handlebars which will give us the ability
//      to execute HTML files from backend
const hbs = require("hbs");
// 'path' module provides utilities for working with file and
//      directory paths.
const path = require("path");
// Gives the ability to run the server
const app = express();

const weatherData = require('../utils/weatherData');

// 'port' will be dertermined by locating a port avaliable by
//      the local host, or create local host 3000. It is
//      proper format to do 'process.env.PORT' to get the
//      most accurate/ initial server
// Host port found by searching 'localhost:3000'
const port = process.env.PORT || 3000

// Move back a directory to open a specific folder
const publicStaticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Create a static template file to make it easier to design 
//      an HTML page.
app.set('view engine', 'hbs');
// Create a path for 'viewsPath'
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Tells the program to use those folders css and js
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        // Title of the app
        title: 'The Weather App'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        // Title of the app
        title: 'About This Website'
    })
});

// '/weather' gives us API access to the data of weather.
// 'req' contains the data of whoever calls the API
// 'res' is the response we are sending to the API
// 'localhost:3000/weather?address=London'
app.get('/weather', (req, res) => 
{
    const address = req.query.address
    if(!address) 
    {
        return res.send({
            error: "You must enter address in search textbox"
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => 
    {
        if(error) 
        {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

// A perticular endpoint does not exist. i.e. if
//      'localhost:3000/gibbrish' was entered into the URL
//      display that the page was not found
app.get("*", (req, res) => {
    res.render('404', {
        title: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})
