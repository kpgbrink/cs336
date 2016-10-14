/*
    6.1
    a. Identify the request methods that you can and can't test usin gthe two tools listed above. If a method cannot be tested using a particular tool, explain why this is the case. List the Curl commands you used successfully. 
        Everything can be tested in both. In curl I successfully did, GET, HEAD, PUT, POST, and DELETE.
    
    b. What is the most appropriate HTTP response code for pages that aren't defined by an Express route?
        404 response code
    6.2
    a. What HTTP methods do forms support?
        GET and POST
    b. How is the form data being passed back to the server and what syntactic form does it take? Is the data modified in any way?
        It is being url-encoded by the browser. The body parser expands it to a plain object.
*/
'use strict';

const express = require('express');
const HttpStatus = require('http-status-codes');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.title = "lab06";

app.get('/', function (req, res) {
  res.send('Hello Lab 6!');
});

app.use(express.static('public'));

const data = new Map();
let key = 0;

// Head has to be before get
app.head('/request', function (req, res) {
    res.set({'X-My-Header': 'Hello'});
    res.end();
});

app.get('/request', function (req, res) {
    // Send data if asked for it
    if (req.query.id) {
        // If data exsits send it
        if (data.has(req.query.id)) {
            res.send(data.get(String(req.query.id)));
        } else {
            res.send('Data requested does not exist');
        }
    } else {
        res.send('Send a get request with a message.')
    }
});

// Generate new id and store the data.
app.post('/request', function (req, res) {
    // Find empty key
    while (data.has(String(key))) {
        key++;
    }
    data.set(String(key), req.body.message);
    res.send(`generated id: ${key}, message: ${req.body.message}`);
});

// Put something into data in specified id
app.put('/request', function (req, res) {
    data.set(req.body.id, req.body.message);
    res.send(`id: ${req.body.id}, message: ${req.body.message}`);
});

// Delete key
app.delete('/request', function (req, res) {
    if (data.delete(req.query.id)) {
        res.send(` Deleted key: ${req.query.id}`);
    } else {
        res.send(` key: ${req.query.id} not found`);
    }
});

app.post('/my-handling-form-page', function (req, res) {
    res.send(`name: ${req.body.user_name} <br> mail: ${req.body.user_mail} <br> message: ${req.body.user_message}`);
});


app.all('*', function (req, res, next) {    
    res.send(HttpStatus.getStatusText(HttpStatus.FORBIDDEN));
});

app.listen(3000, function () {
    console.log('Lab 6 is listening on port 3000!');
});