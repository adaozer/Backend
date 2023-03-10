const express = require('express');
const app = express();

const planeJSON = './plane.json';
const journeyJSON = './journey.json';

const fs = require('fs');

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const planes = require(planeJSON);
const journeys = require(journeyJSON);

app.get('/journeys/:journey', (req, resp) => {
    const journey = req.params.journey;
    const details = journeys[journey];

    resp.send(details);
});

app.get('/journeys', function (req, resp) {
    const keys = Object.keys(journeys);
    resp.send(keys);
});

app.get('/planes', function (req, resp) {
    const planeValues = Object.values(planes);
    resp.send(planeValues);
});

 app.get('/planes/:plane', function (req, resp) {
    const plane = req.params.plane;
    const info = planes[plane].Info;
    resp.send(info);
 });

 app.post('/journeys/new', function (req, resp) {
    const start = req.body.start;
    const destination = req.body.destination;
    const distance = req.body.distance;
    const haul = req.body.haul;
    const passengers = req.body.passengers;
    const transcontinental = req.body.transcontinental;
    const key = start + '-' + destination;

    journeys[key] = {
        Start: start,
        Destination: destination,
        Distance: distance,
        Haul: haul,
        ExpectedPassengers: passengers,
        Transcontinental: transcontinental
    };

    fs.writeFileSync(journeyJSON, JSON.stringify(journeys));
    resp.send(journeys);
});

app.post('/planes/new', function (req, resp) {
    const name1 = req.body.name;
    const img = req.body.image;
    const range = req.body.range + ' km';
    const speed = req.body.speed + ' km/h';
    const passenger = req.body.passenger;
    const price = '$' + req.body.price + ' M';
    const info = req.body.info;
    const key = name1.replace(/\s+/g, '');

    planes[key] = {
        name: name1,
        Image: img,
        MaximumRange: range,
        MaximumSpeed: speed,
        PassengerCapacity: passenger,
        Price: price,
        Info: info
    };

    fs.writeFileSync(planeJSON, JSON.stringify(planes));
    resp.send(planes);
});

module.exports = app;
