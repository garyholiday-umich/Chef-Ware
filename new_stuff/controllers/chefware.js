var mongoose = require('mongoose'),
UserProgress = mongoose.model('UserProgress');

exports.joinServer = function(event, res) {

    var url_params = event.url.split("/");
    var username = url_params[2];
    console.log(username);
    console.log(client_mappings);

    if(client_mappings.hasOwnProperty(username)){
        var client_id = client_mappings[username];
        res.send(200, { user_id: client_id });
    }
    else {
        res.send(400, 'that username is not connected to the server');
    }
}

exports.getUserProgress = function(event, res) {

    // this is a HACKY way to parse the url parameters
    var url_params = event.url.split("/");
    console.log(url_params);
    var user_id_in = url_params[2];

    UserProgress.find({ user_id: user_id_in }, { "keywords": 0 }, function(err, userProgress) {
    	if (err) {
    		res.send(500, 'MongoDB returned an error while searching for documents.');
    	}
        res.send(200, userProgress);
    });
};

exports.updateTimer = function(event, res) {

    // ./curl.exe -i -X POST -H 'Content-Type: application/json' -d '{ "seconds": 68, "type": "start" }' http://localhost:8080/api/timer/{user-id}

    console.log(event);

    // this is a HACKY way to parse the url parameters
    var url_params = event.url.split("/");
    console.log(url_params);
    var user_id_in = url_params[3];

	// error checking - should never exeute
    if (user_id_in === "") {
        res.send(400, 'Bad Request: You need to specify a user id.');
    }
    if (event.body.type === "") {
        res.send(400, 'Bad Request: You need to specify a type of timer event.');
    }

    // check to see if we need to start or pause the timer.
    id_to_socket[user_id_in].emit('timer_update', { timer: event.body.seconds, type: event.body.type } );
    res.send(200, "timer was successfully updated");
};


