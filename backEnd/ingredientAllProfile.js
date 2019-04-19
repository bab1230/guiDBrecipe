//ingredient all (master ingredient table) profile
const Sequelize = require("sequelize")
const db = require("./db")

module.exports = db.sequelize.define(
	'all_ingredients',
	{
		ingredient_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        ingredient_name: {
            type: Sequelize.STRING,
        }
	},
	{
		timestamps: false
	}
)