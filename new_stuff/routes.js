module.exports = function(app){
    var restaurants = require('./controllers/restaurants');
    app.get('/constraints', restaurants.getConstraints);
    app.get('/constraints/:name', restaurants.getConstraintDetails);
}