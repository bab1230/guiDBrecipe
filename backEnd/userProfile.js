//user profile
const Sequelize = require("sequelize")
const db = require("./db")

module.exports = db.sequelize.define(
	'users',
	{
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
		},
		user_name: {
			type: Sequelize.STRING
		},
		user_password: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)