//user ingredient inventory profile
const Sequelize = require("sequelize")
const db = require("./db")

module.exports = db.sequelize.define(
	'user_inventory',
	{
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		ingredient_id: {
			type: Sequelize.INTEGER
		},
		amount: {
			type: Sequelize.INTEGER
		},
		unit: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)