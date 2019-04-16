const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const withAuth = require('../MiddleMan');
const Recipe = require("../recipeProfile")
var app = express();

recipes.use(cors())
process.env.SECRET_KEY = 'secret'

//More to come
recipes.post('/recipe', (req, res) => {
		const userData = {
				recipe_id: req.body.recipe_id,
				recipe_name: req.body.recipe_name,
				how_to_cook: req.body.how_to_cook,
				cuisine_type: req.body.cuisine_type,
				image: req.body.image,
				featured_date: req.body.feature_date
		}
		
		User.findOne({
				where: {
						recipe_id: req.body.recipe_id
				}
		})
				.then(recipe => {
					//get cooking instruction from recipes table
					recipe.recipe_id
		
		}).catch(err => {
				res.send('error: ' + err)
		})
})



module.exports = recipes