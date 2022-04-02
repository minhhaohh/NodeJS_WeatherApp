const asyncRequest = require("async-request");

const getWeather = async (location) => {
    const access_key = "452de5175e2ed32761fc1d5a335fcd0d";
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
    try {
        const res = await asyncRequest(url);
        const data = JSON.parse(res.body);
        const weather = {
            region: data.location.region,
            country: data.location.country,
            temperature: data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover: data.current.cloudcover,
        };
        console.log(weather);
        return weather;
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

const express = require("express");
const app = express();
const port = "7777";
const path = require("path");
const pathPublic = path.join(__dirname, "./public");

app.use(express.static(pathPublic));

app.get("/", async (req, res) => {
    const params = req.query;
    const location = params.address;
    const weather = await getWeather(location);
    if (location) {
        res.render("weather", {
            status: true,
            region: weather.region,
            country: weather.country,
            temperature: weather.temperature,
            wind_speed: weather.wind_speed,
            precip: weather.precip,
            cloudcover: weather.cloudcover,
        });
    } else {
        res.render("weather", {
            status: false,
        });
    }
});

app.set("view engine", "hbs");

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
