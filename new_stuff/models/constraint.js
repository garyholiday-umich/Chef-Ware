var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ConstraintSchema = new Schema(
	{
	  name: String,
	  keywords: [String]
	},
	{
	  collection: 'constraints'
	}
);

mongoose.model('Constraint', ConstraintSchema);