module.exports = function(app){
    var chefware = require('./controllers/chefware');
    app.get('/api/:username', chefware.joinServer);
    app.get('/api/status/:user_id', chefware.getUserProgress);
    app.post('/api/timer/:user_id', chefware.updateTimer);
}