var express = require('express');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var bodyParser = require('body-parser');
var app = express();

// parse application/json
app.use(bodyParser.json());

require('./models/userProgress');
require('./routes')(app);

mongoose = require('mongoose'),
fs = require('fs');

// connecting to the mongodb database
var mongoUri = 'mongodb://chef:boyardi@ds051524.mongolab.com:51524/chefware-db';
var options = { server: { socketOptions: { connectTimeoutMS: 25000 }}}; // bc our database has a shitty response time.

mongoose.connect(mongoUri, options, function(err) {
	if (err) {
  	  throw new Error('unable to connect to database at ' + mongoUri);
	}
	else {
		console.log('successfully connected to the mongodb database in the cloud');
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

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');






// ACTUAL ROUTES

app.get('/', function(req, res) {


	var jsonYo = ' {  "RecipeID": 530115,  "Title": "Teriyaki Chicken",  "Description": "Great basic Chicken Teriyaki recipe. Why use the bottled stuff when the make-it-yourself marinade is easy and so much tastier?",  "Cuisine": "Japanese",  "Category": "Main Dish",  "Subcategory": "Grill and BBQ",  "PrimaryIngredient": "Chicken",  "StarRating": 4.6,  "WebURL": "http://www.bigoven.com/recipe/teriyaki-chicken/530115",  "ImageURL": "http://redirect.bigoven.com/pics/rs/640/chicken-teriyaki-10.jpg",  "ReviewCount": 5,  "MedalCount": 0,  "FavoriteCount": 568,  "Poster": {    "UserID": 29,    "UserName": "stevemur",    "ImageURL48": "http://images.bigoven.com/image/upload/t_recipe-48,d_avatar-default.png/uchantyakshfoptvjvrz",    "PhotoUrl": "http://photos.bigoven.com/avatar/photo/uchantyakshfoptvjvrz",    "IsPremium": true,    "IsKitchenHelper": true,    "PremiumExpiryDate": "\\/Date(1480444911497)\\/",    "MemberSince": "\\/Date(1074527940000)\\/",    "IsUsingRecurly": true  },  "Ingredients": [    {      "IngredientID": 5247317,      "DisplayIndex": 0,      "IsHeading": false,      "Name": "Soy Sauce",      "HTMLName": "Soy Sauce",      "Quantity": 0.333333333333333,      "DisplayQuantity": "1/3",      "Unit": "cup",      "MetricQuantity": 79,      "MetricDisplayQuantity": "79",      "MetricUnit": "ml",      "PreparationNotes": null,      "IngredientInfo": {        "Name": "Soy Sauce",        "Department": "Asian"      },      "IsLinked": true    },    {      "IngredientID": 5247318,      "DisplayIndex": 1,      "IsHeading": false,      "Name": "Dry sherry",      "HTMLName": "Dry sherry",      "Quantity": 0.25,      "DisplayQuantity": "1/4",      "Unit": "cup",      "MetricQuantity": 59,      "MetricDisplayQuantity": "59",      "MetricUnit": "ml",      "PreparationNotes": null,      "IngredientInfo": {        "Name": "Dry sherry",        "Department": "Wines"      },      "IsLinked": true    },    {      "IngredientID": 5247319,      "DisplayIndex": 2,      "IsHeading": false,      "Name": "Vegetable Oil",      "HTMLName": "Vegetable Oil",      "Quantity": 0.333333333333333,      "DisplayQuantity": "1/3",      "Unit": "cup",      "MetricQuantity": 79,      "MetricDisplayQuantity": "79",      "MetricUnit": "ml",      "PreparationNotes": null,      "IngredientInfo": {        "Name": "Vegetable Oil",        "Department": "Oils"      },      "IsLinked": true    },    {      "IngredientID": 5247320,      "DisplayIndex": 3,      "IsHeading": false,      "Name": "Brown Sugar",      "HTMLName": "Brown Sugar",      "Quantity": 1.5,      "DisplayQuantity": "1 1/2",      "Unit": "tablespoons",      "MetricQuantity": 22,      "MetricDisplayQuantity": "22",      "MetricUnit": "ml",      "PreparationNotes": null,      "IngredientInfo": {        "Name": "Brown Sugar",        "Department": "Baking"      },      "IsLinked": true    },    {      "IngredientID": 5247321,      "DisplayIndex": 4,      "IsHeading": false,      "Name": "Fresh Ginger",      "HTMLName": "Fresh Ginger",      "Quantity": 1,      "DisplayQuantity": "1",      "Unit": "tablespoon",      "MetricQuantity": 15,      "MetricDisplayQuantity": "15",      "MetricUnit": "ml",      "PreparationNotes": "grated",      "IngredientInfo": {        "Name": "Fresh Ginger",        "Department": "Produce"      },      "IsLinked": true    },    {      "IngredientID": 5247322,      "DisplayIndex": 5,      "IsHeading": false,      "Name": "boneless chicken breast halves",      "HTMLName": "boneless chicken breast halves",      "Quantity": 4,      "DisplayQuantity": "4",      "Unit": null,      "MetricQuantity": 4,      "MetricDisplayQuantity": "4",      "MetricUnit": "",      "PreparationNotes": "trimmed of fat",      "IngredientInfo": {        "Name": "boneless chicken breast halves",        "Department": "Poultry"      },      "IsLinked": true    },    {      "IngredientID": 5247323,      "DisplayIndex": 6,      "IsHeading": true,      "Name": "Optional garnish",      "HTMLName": "",      "Quantity": 1,      "DisplayQuantity": null,      "Unit": null,      "MetricQuantity": 0,      "MetricDisplayQuantity": "",      "MetricUnit": "",      "PreparationNotes": null,      "IngredientInfo": null,      "IsLinked": false    },    {      "IngredientID": 5247324,      "DisplayIndex": 7,      "IsHeading": false,      "Name": "Sesame seeds",      "HTMLName": "Sesame seeds",      "Quantity": 1,      "DisplayQuantity": null,      "Unit": null,      "MetricQuantity": 0,      "MetricDisplayQuantity": "",      "MetricUnit": "",      "PreparationNotes": null,      "IngredientInfo": {        "Name": "Sesame seeds",        "Department": "Spices"      },      "IsLinked": true    },    {      "IngredientID": 5247325,      "DisplayIndex": 8,      "IsHeading": false,      "Name": "Scallions",      "HTMLName": "Scallions",      "Quantity": 1,      "DisplayQuantity": null,      "Unit": null,      "MetricQuantity": 0,      "MetricDisplayQuantity": "",      "MetricUnit": "",      "PreparationNotes": null,      "IngredientInfo": {        "Name": "Scallions",        "Department": "Produce"      },      "IsLinked": true    }  ],  "Instructions": "Prepare marinade: Mix soy sauce, dry sherry, vegetable oil, brown sugar and ginger.  Whisk to incorporate. Add to plastic ziptop bag with chicken breasts.  Gently press to remove air, and place in a bowl in the fridge for at least 2 hours, up to 6. Turn on grill to medium heat.  Oil grill.  Place chicken breasts on grill, and let cook for 2 minutes.  Then turn 90 degrees.  Cook for 2 more minutes and flip.  Cook for 2 more minutes.  Turn 90 degrees.  Check for doneness, remove from grill when done.  Let rest on cutting board for 2 minutes.  Slice on bias and serve atop white rice.  Sprinkle with sesame seeds and or grilled scallions to garnish.  ",  "YieldNumber": 4,  "YieldUnit": "Servings",  "TotalMinutes": 180,  "ActiveMinutes": 20,  "NutritionInfo": {    "SingularYieldUnit": "1 Serving (466g)",    "TotalCalories": 528,    "TotalFat": 23.316175517769967,    "CaloriesFromFat": 210,    "TotalFatPct": 0.3108823402369329,    "SatFat": 3.3890373011313577,    "SatFatPct": 0.1694518650565679,    "MonoFat": 14.082038863021811,    "PolyFat": 4.383178452679457,    "TransFat": 1.4619209009373422,    "Cholesterol": 55.68,    "CholesterolPct": 0.1713230769230769,    "Sodium": 18999.911704439695,    "SodiumPct": 6.5516936911861015,    "Potassium": 968.8308271141401,    "PotassiumPct": 0.2549554808195105,    "TotalCarbs": 38.39837382837061,    "TotalCarbsPct": 0.11293639361285474,    "DietaryFiber": 3.0802700533532446,    "DietaryFiberPct": 0.12321080213412978,    "Sugar": 35.31810377501736,    "Protein": 39.84860956070838,    "ProteinPct": 0.5692658508672626  },  "IsPrivate": false,  "CreationDate": "\\/Date(1369489301000)\\/",  "LastModified": "\\/Date(1429035195983)\\/",  "IsBookmark": false,  "BookmarkURL": null,  "BookmarkSiteLogo": "",  "BookmarkImageURL": null,  "IsRecipeScan": null,  "MenuCount": 4,  "NotesCount": 4,  "AdTags": "simplypotatoes15",  "IngredientsTextBlock": null,  "AllCategoriesText": "collsxgrillm",  "IsSponsored": false,  "VariantOfRecipeID": null,  "Collection": "collsxgrillm",  "AdminBoost": 100,  "VerifiedDateTime": "\\/Date(1369507313000)\\/",  "MaxImageSquare": null,  "ImageSquares": [],  "HeroPhotoUrl": "http://photos.bigoven.com/recipe/hero/chicken-teriyaki-10.jpg",  "VerifiedByClass": "editor"}	';

	// do server side parsing / api requests, then send it to webpage
  res.render('home', {ra: jsonYo});
});

// ************************ Listening on Port 8080 ******************
app.listen(8080);
console.log('Listening on port 8080...');