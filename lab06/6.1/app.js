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

app.get('/request', function (req, res) {
    res.send('Got a GET request');
});

app.post('/request', function (req, res) {
  res.send('Got a POST request');
});

app.put('/request', function (req, res) {
  res.send('Hello, form POST!<br>Posted message: <code>' + req.body.message + '<code>');
});

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request at /request');
});

app.head('/request', function (req, res) {
    res.send('Got a HEAD request at /request')
});

app.all('*', function (req, res, next) {  res.send(HttpStatus.getStatusText(HttpStatus.FORBIDDEN));
});

app.listen(3000, function () {
  console.log('Lab 6 is listening on port 3000!');
});