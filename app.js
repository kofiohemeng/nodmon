// app.js

var express = require('express');
var bodyParser = require('body-parser');

var user = require('./routes/user'); // Imports routes for the users
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/customer';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('connected', console.error.bind(console, 'MongoDB connected'));
conn.on('disconnected', console.error.bind(console, 'MongoDB disconnected'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', user);

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/customer', function (req, res) {
    res.sendFile(__dirname +'/view/user.html');
});