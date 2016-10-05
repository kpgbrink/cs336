'use strict';

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/people', function (req, res) {
    res.send(people);
});
        
app.get('/person/:id', function (req, res) {
    var id = req.params.id;
    // Send the person with the id
    res.send(findById(people, id, res));
});

app.get('/person/:id/name', function (req, res) {
    var id = req.params.id;
    var name = req.params.name;
    // Find person by id
    var person = findById(people, id, res);
    res.send(person.name);
});

app.get('/person/:id/years', function (req, res) {
    var id = req.params.id;
    // Find person by id
    var person = findById(people, id, res);
    var years = person.calculateYears();
    res.send(String(years));
});


// Data being used
function Person(id, name, dateStarted) {
    this.id = id;
    this.name = name;
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

var person1 = new Person(1, "Kristofer Brink", "2015/08/23");
var person2 = new Person(2, "Boby Dobby", "2013/08/23");
var person3 = new Person(3, "Toddy Hobby", "2012/08/23");
var people = [person1, person2, person3];


function findById(people, id, res) {
    console.log(people);
    for(var i in people) {
        if(people[i].id == id) {
            return people[i];
        }
    }
    res.status(404).send("404 ERROR! \nPerson of id " + id + " not found!");
}
