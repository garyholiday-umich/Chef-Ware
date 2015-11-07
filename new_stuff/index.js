var express = require('express');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var bodyParser = require('body-parser');
var app = express();

// parse application/json
app.use(bodyParser.json());

require('./models/userProgress');
require('./routes')(app);

mongoose = require('mongoose'),
fs = require('fs');

// connecting to the mongodb database
var mongoUri = 'mongodb://chef:boyardi@ds051524.mongolab.com:51524/chefware-db';
var options = { server: { socketOptions: { connectTimeoutMS: 25000 }}}; // bc our database has a shitty response time.

mongoose.connect(mongoUri, options, function(err) {
	if (err) {
  	  throw new Error('unable to connect to database at ' + mongoUri);
	}
	else {
		console.log('successfully connected to the mongodb database in the cloud');
	}
});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

// ************* defining routes that AREN'T part fo the API ****************
var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// ACTUAL ROUTES

app.get('/', function(req, res) {
  res.render('home', {title: 'home', recipe: "an object"});
});

// ************************ Listening on Port 8080 ******************
app.listen(8080);
console.log('Listening on port 8080...');