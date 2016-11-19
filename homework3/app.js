'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://cs336:PASSWORD@ds157667.mlab.com:57667/people', function (err, dbConnection) {
  if (err) throw err

  db = dbConnection;
  
  app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
});

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest people.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

process.title = "homework3";

app.get('/api/people', function(req, res) {
    db.collection('people').find().toArray(function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } 
        res.json(data);
    });
});

app.post('/api/people', function(req, res) {
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newPerson = {
      id: Date.now(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateStarted: req.body.dateStarted
    };
    
  db.collection('people').insertMany([newPerson], function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
      res.json(newPerson);
  });
});

app.use(express.static('public'));


app.get('/people', function (req, res) {
    var people = [];
    for (let person of data.values()) people.push(person);
    res.send( people );
});
        
app.get('/person/:id', function (req, res) {
    var id = req.params.id;
    // Send the person with the id
    res.send(findById(data, id, res));
});

app.put('/person/:id', function (req, res) {
    var id = req.body.id;
    var person = new Person(req.body.firstName, req.body.lastName, req.body.dateStarted);
    person.id = id;
    setPerson(id, person);
});

app.delete('/person/:id', function (req, res) {
    var id = req.params.id;
    console.log("deleted: " + data.delete(id));
});

app.get('/person/:id/name', function (req, res) {
    var id = req.params.id;
    var name = req.params.name;
    // Find person by id
    var person = findById(data, id, res);
    res.send(person.firstName + " " + person.lastName);
});

app.get('/person/:id/years', function (req, res) {
    var id = req.params.id;
    // Find person by id
    var person = findById(data, id, res);
    var years = person.calculateYears();
    res.send(String(years));
});

app.post('/people', function (req, res) {
    let person = new Person(req.body.firstName, req.body.lastName, req.body.dateStarted)
    addPerson(person);
    res.send(person)
});

// Data being used
function Person(firstName, lastName, dateStarted) {
    this.id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateStarted = dateStarted;
}

Person.prototype.calculateYears = function() {
    var today = new Date();
    var birthDate = new Date(this.dateStarted);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function addPerson(person) {
    while (data.has(String(key))) {
        key++;
    }
    person.id = key;
    setPerson(key, person);
}

function setPerson(id, person) {
    data.set(String(id), person);
}

function findById(people, id, res) {
    console.log(people);
    if (data.has(id)) {
        return data.get(id);
    }
    res.status(404).send("404 ERROR! \nPerson of id " + id + " not found!");
}
