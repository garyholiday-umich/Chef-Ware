var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserProgressSchema = new Schema(
	{
	  user_id: Number,
	  recipe: String,
	  current_step: Number,
	  description: String
	},
	{
	  collection: 'chefware-users'
	}
);

mongoose.model('UserProgress', UserProgressSchema);