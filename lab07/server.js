var express = require('express');
var app = express();

// Use static files
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send(`<a href="/lab7_1.html">lab7_1.html</a> <br> <a href="/lab7.html">lab7.html</a>`);
});

app.get('/fetch', function (req, res) {
   res.json({content: "Hello, " + req.query.name + "   ---data transfer complete."}); 
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

