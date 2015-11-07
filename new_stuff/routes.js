module.exports = function(app){
    var chefware = require('./controllers/chefware');
    app.get('/api/:user_id/:recipe', chefware.getUserProgress);
    app.post('/api/:user_id/:recipe', chefware.startTimer);
}