var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Use Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// Import API Routes
app.use('/user', require('./api/user.api'));
app.use('/admin', require('./api/admin.api'));

port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening to port " + port);
})
