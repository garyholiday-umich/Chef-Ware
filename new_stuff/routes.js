module.exports = function(app){
    var chefware = require('./controllers/chefware');
    app.get('/:user_id/:recipe', chefware.getUserProgress);
    app.post('/:user_id/:recipe', chefware.startTimer);
}