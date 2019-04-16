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
		how_to_cook: {
			type: Sequelize.STRING
		},
		cuisine_type: {
			type: Sequelize.STRING
		},
		image: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)
