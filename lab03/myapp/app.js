var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(express.static('static'));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

// 1.
// https://github.com/expressjs/express/blob/master/package.json
// Purpose of pacakages.json file = defines dependencies.
// Purpose of node modules = way to org code
