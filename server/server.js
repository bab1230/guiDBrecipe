var express = require('express');
var path = require('path');
var cors = require('cors');
var mysql = require('mysql');
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

process.env.SECRET_KEY = 'secret'
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  user_name: "",
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie  : { maxAge  :  86400 * 1000}
}));

//------------------------------------ Connection to MySQL ------------------------------------

var connection = mysql.createPool({
    connectionLimit : process.env.mysql_connection_pool_Limit, // default:10
    host: 'dbinstanceaws.cr1itmhwscoi.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbteam',
    password: 'dbpassword',
    database: 'dbteam'
});

//------------------------------------ Register ------------------------------------
app.post('/users/register', (req, res) => {
    const userData = [req.body.user_id,
                    req.body.first_name,
                    req.body.last_name,
                    req.body.user_name,
                    req.body.user_password]

    connection.query('INSERT INTO users (user_id, first_name, last_name, user_name, user_password) VALUES (?, ?, ?, ?, ?)',
                    userData, function(err, result) {
                  if (err) throw err
                  else{
                    console.log("user ", req.body.user_name, "created")
                  }
                })
})

//------------------------------------ Login ------------------------------------
app.post('/users/login', (req, res) => {
    req.session.user_name = req.body.user_name
    var user_password = req.body.user_password
    if (req.session.user_name && user_password) {
            connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?',
                            [req.session.user_name, user_password], function(error, results, fields) {
                      if (results.length === 1) {
                          console.log("Login Success!");
                          req.session.loggedin = true;
                        } else {
                          res.send('Incorrect Username and/or Password!');
                          req.session.loggedin = false;
                        }
                      res.end();
                      });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
})

//------------------------------------ Logout ------------------------------------

app.get('/users/logout', function (req, res) {
  if (req.session.loggedin){
    req.session.destroy();
    res.send("Logout successful!");
  }
  else{
    res.send("<h1>You are not logged in. Can't log out!</h1>")
  }
});


//------------------------------------ User Favorite ------------------------------------
//Response sends back an array of recipe_ID in favorites
app.get('/users/favorite', (req, res) => {
  var user_id = req.body.user_id;
  connection.query('SELECT * FROM users JOIN favorites ON users.user_id = favorites.user_id WHERE users.user_id = ?', [user_id], function(error, results, fields) {
            // res.send([results[0].user_id, results[0].user_name, results[0].recipe_id, results[1].recipe_id, results[2].recipe_id]);
            let recipeID = []
            for(let i = 0; i < results.length; i++){
                recipeID.push(results[i].recipe_id)
            }
            res.send(recipeID);
      });
})


app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
