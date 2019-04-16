//user profile
const Sequelize = require("sequelize")
const db = require("./db")

module.exports = db.sequelize.define(
	'recipes',
	{
		recipe_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		recipe_name: {
			type: Sequelize.STRING
		},
		cooking_instruction: {
			type: Sequelize.STRING
		},
		recipe_type: {
			type: Sequelize.STRING
		},
		recipe_date: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)