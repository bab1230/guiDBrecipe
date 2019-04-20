var express = require('express');
var path = require('path');
var cors = require('cors');
var mysql = require('mysql');
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var random = require('random')


process.env.SECRET_KEY = 'secret'
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
var sess = {
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie  : { maxAge  :  86400 * 1000}
}

app.use(session(sess));

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
    const userData = [random.int(1000000, 100000000000),
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
    var user_nameTemp = req.body.user_name
    var user_password = req.body.user_password
    if (req.session.loggedin)
    {
      res.status(200).send('You are logged in as ' +  req.session.user_name);
    }
    else {
          if (user_nameTemp && user_password) {
                  connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?',
                                  [user_nameTemp, user_password], function(error, results, fields) {
                            if (results.length === 1) {
                                req.session.user_id = results[0].user_id;
                                console.log("Login Success!");
                                req.session.user_name = req.body.user_name;
                                req.session.loggedin = true;
																res.status(200).send('Login Seccess!')
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
//Account favorite recipes
app.get('/users/favorite', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
        console.log("User ID is ", req.session.user_id);
        connection.query('SELECT * FROM users JOIN favorites JOIN recipes ON users.user_id = favorites.user_id AND recipes.recipe_id = favorites.recipe_id WHERE users.user_id = ?',
                        [req.session.user_id], function(error, results, fields) {
                  let responseToFrontend = {}
                  for(var i = 0; i < results.length; i++){
                      responseToFrontend[results[i].recipe_name] = results[i].how_to_cook;
                  }
                  res.status(200).send(responseToFrontend);//This is an object
            });
    }
})

//Delete recipes from favorite
app.post('/users/favorite/delete', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
    var recipeID = req.body.recipe_id;
        console.log("User ID is ", req.session.user_id);
        connection.query('DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?',
                        [req.session.user_id, recipeID], function(error, results, fields) {
                  res.status(200).send("Delete successful");//This is an object
            });
    }
})

//Add recipes to favorite
app.post('/users/favorite/add', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
    var recipeID = req.body.recipe_id;
        console.log("User ID is ", req.session.user_id);
        connection.query('INSERT INTO favorites VALUES (?, ?)',
                        [req.session.user_id, recipeID], function(error, results, fields) {
                  res.status(200).send("Add successful");//This is an object
            });
    }
})


//------------------------------------ Pantry ingredients ------------------------------------
//Add
app.get('/users/pantry', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
    var inStock = {};
        console.log("User ID is ", req.session.user_id);
        connection.query('SELECT * FROM inventory JOIN ingredient_all ON inventory.ingredient_id = ingredient_all.ingredient_id WHERE inventory.user_id = ?',
                        [req.session.user_id], function(error, results, fields) {
                  // for (var i = 0; i < results.length; i++) {
                  //   results[i]
                  // }
                  res.status(200).send(results);//This is an object
            });
    }
})


//------------------------------------ Pantry ingredients ------------------------------------
//Delete

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
