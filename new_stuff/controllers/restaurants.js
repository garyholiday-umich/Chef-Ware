var mongoose = require('mongoose'),
Constraint = mongoose.model('Constraint');

exports.getConstraints = function(event, res) {

    Constraint.find({}, { "keywords": 0 }, function(err, constraintList) {
    	if (err) {
    		res.send(500, 'MongoDB returned an error while searching for documents.');
    	}
        res.send(200, constraintList);
    });
};

exports.getConstraintDetails = function(event, res) {

    event = event.body;

    for (var key in event) {
        if (event[key] === "") {
            event[key] = undefined;
        }
    }

	// error checking - should never exeute
    if (typeof event.constraint === "undefined") {
        // * LOOK BACK AT THIS * lets change this to a 404 error or endpoint not found error
        res.send(400, 'Bad Request: You need to specify a constraint');
    }

    // making sures its a valid constraint endpoint
    if (!validConstraints[event.constraint]) {
        res.send(404, "Endpoint Not Found: that constraint is not in our service");
    }

    // grabbing just the restaurant info - not giving certain keys bc they should be private
    Constraint.find({ "constraint": event.constraint }, {}, function(err, constraintInfo) {
		if (err) {
    		res.send(500, 'MongoDB returned an error while searching for documents.');
    	}
        res.send(200, constraintInfo[0]);
    });
};


