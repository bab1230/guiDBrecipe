var express = require('express');
var path = require('path');
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
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie  : { maxAge  :  86400 * 1000)}
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
    var user_name = req.body.user_name
    var user_password = req.body.user_password
    if (user_name && user_password) {
            connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?',
                            [user_name, user_password], function(error, results, fields) {
                      if (results.length === 1) {
                          console.log("Login Success!")
                        } else {
                          res.send('Incorrect Username and/or Password!');
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
app.get('/users/favorite', (req, res) => {
  connection.query('SELECT * FROM users NATURAL JOIN favorites ON users.user_id = favorites.user_id WHERE user_id = ?',
                    [req.body.user_id], function(error, results, fields) {
            res.send(results);
            res.end();
            });
})


app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
