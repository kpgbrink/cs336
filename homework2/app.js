'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.title = "homework2";

app.get('/', function (req, res) {
  res.send('<a href="collect.html"> collect </a> <br> <a href="post.html"> post </a>');
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

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

const data = new Map();
var key = 0;

addPerson(new Person("Kristofer", "Brink", "2015/08/23"));
addPerson(new Person("Boby", "Dobby", "2013/08/23"));
addPerson(new Person("Toddy", "Hobby", "2012/08/23"));

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
