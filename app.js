const express = require('express');
const app = express();

const fs = require('fs');

const journeyJSON = './journey.json';
const planeJSON = './plane.json';

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const planes = require(planeJSON);
const journeys = require(journeyJSON);

module.exports = app;