// const Recipe = require("./recipeProfile")
// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var app = express();
// const port = process.env.PORT || 4000;
//
// //app.use(cookieParser());
// app.use(bodyParser.json());
// //app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
//
// //More to come
// app.get('/recipe', (req, res) => {
// 		Recipe.findOne({
// 				where: {
// 						recipe_id: 3
// 				}
// 		})
// 				.then(recipeData => {
// 					//get cooking instruction from recipes table
// 					res.send(recipeData.how_to_cook)
//
// 		}).catch(err => {
// 				res.send('error: ' + err)
// 		})
// })
//
// app.listen(port, () => {
//   console.log("Server is running on port: " + port)
// })


var express = require('express');
var path = require('path');
var cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const Sequelize = require("sequelize")
const db = require("./db")
// var Users = require('./routes/users');
var app = express();

process.env.SECRET_KEY = 'secret'
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

process.env.SECRET_KEY = 'secret'

var connection = mysql.createPool({
    connectionLimit : process.env.mysql_connection_pool_Limit, // default:10
    host: 'dbinstanceaws.cr1itmhwscoi.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbteam',
    password: 'dbpassword',
    database: 'dbteam'
});

app.post('/users/register', (req, res) => {
    const userData = [req.body.user_id, req.body.first_name, req.body.last_name, req.body.user_name, req.body.user_password]

    connection.query('INSERT INTO users (user_id, first_name, last_name, user_name, user_password) VALUES (?, ?, ?, ?, ?)', userData, function(err, result) {
      if (err) throw err
      else{
        console.log("user ", user_name, "created")
      }
  })
})

app.post('/users/login', (req, res) => {
    var user_name = req.body.user_name
    var user_password = req.body.user_password
    if (user_name && user_password) {
            connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?', [user_name, user_password], function(error, results, fields) {
                      if (results.length > 0) {
                          request.session.loggedin = true;
                          request.session.username = username;
                          response.redirect('/home');
                        } else {
                          response.send('Incorrect Username and/or Password!');
                        }
                      response.end();
                      });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
})


app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
