const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("dbteam", "dbteam", "dbpassword", {
    host: 'dbinstanceaws.cr1itmhwscoi.us-east-2.rds.amazonaws.com',
    port: '3306',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 150,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
