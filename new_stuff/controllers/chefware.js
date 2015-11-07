var mongoose = require('mongoose'),
UserProgress = mongoose.model('UserProgress');

exports.getUserProgress = function(event, res) {

    // this is a HACKY way to parse the url parameters
    var url_params = event.url.split("/");

    console.log(url_params);

    var user_id_in = url_params[2];
    var recipe_in = url_params[3];

    UserProgress.find({ user_id: user_id_in, recipe: recipe_in }, { "keywords": 0 }, function(err, userProgress) {
    	if (err) {
    		res.send(500, 'MongoDB returned an error while searching for documents.');
    	}
        res.send(200, userProgress);
    });
};

exports.startTimer = function(event, res) {

    event = event.body;

    for (var key in event) {
        if (event[key] === "") {
            event[key] = undefined;
        }
    }

	// error checking - should never exeute
    if (typeof event.user_id === "undefined") {
        res.send(400, 'Bad Request: You need to specify a user id.');
    }
    if (typeof event.recipe === "undefined") {
        res.send(400, 'Bad Request: You need to specify a recipe.');
    }

    // ****************** UPDATE THE CLIENT PAGE WITH A TIMER ******************
    res.send(200, "hello");
};


