//ingredient for recipes (all ingredients for a recipe) profile
const Sequelize = require("sequelize")
const db = require("./db")

module.exports = db.sequelize.define(
	'recipe_ingredients',
	{
		recipe_id: {
			type: Sequelize.INTEGER
        },
        ingredient_id: {
            type: Sequelize.INTEGER
        },
		amount: {
			type: Sequelize.STRING
		},
		unit: {
			type: Sequelize.STRING
		},
		notes: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)