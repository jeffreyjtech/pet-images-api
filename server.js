'use strict';

console.log("Hello world!");

const { request, response } = require('express');
// In servers, packages are imported with the following signature
const express = require('express');
const req = require('express/lib/request');

// This is how you "activate" express once imported
const app = express();

// This is how we bring in env variables per dotenv's docs
require('dotenv').config();
const PORT = process.env.PORT || 3002;

// Here we're doing a json file import
const petData = require('./data/pets.json');

// Creating basic default route
// a basic URL with domainname/ will get this response
app.get('/', (request, response) => {
  // Response.send inserts it's argument into <body>
  // This method call is needed to keep the page from hanging
  response.send('Hello, form our server!');
});

app.get('/sayHello', (request, response) => {
  let name = request.query.name;
  response.send(`Hi ${name}`);
});

// If the user types in "%%domain%%/banana", they'll see this
app.get('/banana', (request, response) =>{
  response.send('delicious banana');
});

app.get('/pet', (request, response) => {
  let species = request.query.species;

  let pet = petData.find(pet => pet.species === species);
  response.send(`You found him! ${pet.name} the ${pet.species}!`,);
});

// Asterisk is a wildcard character for the first parameter
// This route shows the text "page not found" if an invalid URL route was entered
app.get('*', (request, response) => {
  response.send('Page not found');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
