var express = require('express');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
io = require('socket.io')(http);

var Logger = require('le_node');
var log = new Logger({
  token:'0193579f-077a-32d5-8b82-f668588330d8'
});

// parse application/json
app.use(bodyParser.json());

require('./models/userProgress');
require('./routes')(app);

mongoose = require('mongoose'),
fs = require('fs');
UserProgress = mongoose.model('UserProgress');

// connecting to the mongodb database
var mongoUri = 'mongodb://chef:boyardi@ds051524.mongolab.com:51524/chefware-db';
var options = { server: { socketOptions: { connectTimeoutMS: 25000 }}}; // bc our database has a shitty response time.

mongoose.connect(mongoUri, options, function(err) {
	if (err) {
  	  throw new Error('unable to connect to database at ' + mongoUri);
	}
	else {
		console.log('successfully connected to the mongodb database in the cloud');
    log.info("I'm a Lumberjack and I'm connected to MONGOdb");
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

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// ACTUAL ROUTES

app.get('/', function(req, res) {

	// do server side parsing / api requests, then send it to webpage
  log.info("rendering the first page,,,, LOL!!!");
  res.render('search', {ra: "pizza"});
});

app.get('/home', function(req, res) {

	// do server side parsing / api requests, then send it to webpage
  res.render('home', {ra: req.query.id});
});

// ************ SOCKET IO INTEGRATION *********************
client_mappings = {};
id_to_socket = {};

io.on('connection', function(socket){
  console.log('a user connected');

  // when a user joins
  socket.on('join', function (data) {
    socket.join(data.user_id); // We are using room of socket io
    client_mappings[data.username] = data.user_id;
    id_to_socket[data.user_id] = socket;

    var query = { 'user_id': data.user_id };

    var update = {
    	"user_id": data.user_id,
    	"current_step": 0,
    	"recipe": "",
    	"description": ""
    };

    UserProgress.findOneAndUpdate(query, update, { upsert: true }, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    console.log("succesfully joined session");
	    console.log(update);
	  });
  });

  // when the user goes to a different step
  socket.on('updateSocket and getUserID', function(data) {

    var query = { 'user_id': update.user_id };
    var return_id = client_mappings[data.username];
    id_to_socket[return_id] = socket;

    console.log('update & returned socket');

    // sending the id back to the client webpage (so it doesnt change every pageload)
    socket.emit('receive_id', { id: return_id });
  });

  // when the user goes to a different step
  socket.on('user update', function(update){
    console.log('updating the following users entry to be: ');
    console.log(update);

    var query = { 'user_id': update.user_id };

  	UserProgress.findOneAndUpdate(query, update, function(err, doc){
  	    if (err) return res.send(500, { error: err });
  	    console.log("succesfully saved");
  	});
  });

  socket.on('disconnect', function(){
    console.log('lets delete the user\'s entry in the database');
    // UserProgress.find({ id: user_id}).remove( function(err) {
    // 	if (err)
    // 		console.log('couldn\'t delete the document!');
    // 	else 
    // 		console.log('successfully deleted ' + user_id);
    // });
  });

});

// ************************ Listening on Port 8080 ******************
// app.listen(process.env.PORT || 8080);
// console.log('listening on port 8080... hahaha...');

http.listen(process.env.PORT || 8080, function(){
  console.log('Listening on port 8080...');
});

