const Recipe = require("./recipeProfile")
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
const port = process.env.PORT || 4000;

//app.use(cookieParser());
app.use(bodyParser.json());
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//More to come
app.get('/recipe', (req, res) => {
		Recipe.findOne({
				where: {
						recipe_id: 3
				}
		})
				.then(recipeData => {
					//get cooking instruction from recipes table
					res.send(recipeData.how_to_cook)

		}).catch(err => {
				res.send('error: ' + err)
		})
})

app.listen(port, () => {
  console.log("Server is running on port: " + port)
})
