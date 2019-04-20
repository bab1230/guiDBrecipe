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

//------------------------------------------------------------------------ Connection to MySQL ------------------------------------------------------------------------

var connection = mysql.createPool({
    connectionLimit : process.env.mysql_connection_pool_Limit, // default:10
    host: 'dbinstanceaws.cr1itmhwscoi.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbteam',
    password: 'dbpassword',
    database: 'dbteam'
});

//------------------------------------------------------------------------ Register ------------------------------------------------------------------------
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
																res.send('Login Success!')
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

//------------------------------------------------------------------------ Logout -----------------------------------------------------------------------

app.get('/users/logout', function (req, res) {
  if (req.session.loggedin){
    req.session.destroy();
    res.send("Logout successful!");
  }
  else{
    res.send("<h1>You are not logged in. Can't log out!</h1>")
  }
});


//------------------------------------------------------------------------ User Favorite ------------------------------------------------------------------------
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
                  res.status(200).send("Add successful");//Add success
            });
    }
})


//------------------------------------------------------------------------ Pantry ingredients ------------------------------------------------------------------------
//Get all inventory of users
app.get('/users/pantry', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
		var inStock = {}
					connection.query('SELECT inventory.ingredient_name, inventory.amount, inventory.unit FROM users JOIN inventory ON users.user_id = inventory.user_id',
											 function(error, results, fields) {
														if(error) { throw error }
														else{
															// for(var i = 0; i < results.length; i++){
						                  //     inStock[results[i].recipe_name] = results[i].how_to_cook
						                  // }
						                  res.status(200).send(results);//This is an array
														}
													})
					}
})




//Add inventory
app.post('/users/pantry/add', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
					var ingre_id_from_all = -1;
					//Get existing ingredient id from ingredient_all table
					connection.query('SELECT ingredient_id FROM ingredient_all WHERE ingredient_name = ? LIMIT 1',
											[req.body.ingredient_name], function(error, results, fields) {
												if(error) throw error
												else{
													if(results.length > 0){ ingre_id_from_all = results[0].ingredient_id }
												}
											})
					if(ingre_id_from_all != -1)	{//If ingredient exists in ingredient_all table
												user_add_inventory = [req.session.user_id, ingre_id_from_all, req.body.amount, req.body.unit]
										        console.log("User ID is ", req.session.user_id , " adds ingredient");
										        connection.query('INSERT INTO inventory (user_id, ingredient_id, amount, unit) VALUES (?, ?, ?, ?)',
										                        user_add_inventory, function(error, results, fields) {
										                  res.status(200).send('Add Success');//Add success
										            });
										}
					else{//If ingredient does not exist in ingredient_all table
						connection.query('INSERT INTO ingredient_all (ingredient_name) VALUES (?)'),
												[req.body.ingredient_name], function(error, results, fields) {
													if(error) throw error
												}

						//Get new ingredient id
						connection.query('SELECT ingredient_id FROM ingredient_all ORDER BY ingredient_id DESC LIMIT 1',
												function(error, results, fields) {
													if(error) throw error
													else{
														if(results.length > 0){ ingre_id_from_all = results[0].ingredient_id }
													}
												})
						//Insert into inventory
						user_add_inventory = [req.session.user_id, ingre_id_from_all, req.body.amount, req.body.unit]
						console.log("User ID is ", req.session.user_id , " adds ingredient");
						connection.query('INSERT INTO inventory (user_id, ingredient_id, amount, unit) VALUES (?, ?, ?, ?)',
														user_add_inventory, function(error, results, fields) {
											res.status(200).send('Add Success');//Add success
								});
					}
    }
})


//Delete inventory
app.post('/users/pantry/delete', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
					connection.query('DELETE FROM inventory WHERE user_id = ? AND ingredient_name = ?',
											[req.session.user_id, req.body.ingredient_name], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send('Delete Success');//Delete success
												}
											})
					}
})



//Update inventory ------ IN PROGRESS
app.post('/users/pantry/update', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
					var ingre_id_from_all = -1;
					//Get existing ingredient id from ingredient_all table
					connection.query('SELECT ingredient_all.ingredient_name FROM inventory JOIN ingredient_all ON inventory.ingredient_id = ingredient_all.ingredient_id WHERE ingredient_name = ? LIMIT 1',
											[req.body.ingredient_name], function(error, results, fields) {
												if(error) throw error
												else{
													if(results.length > 0){ ingre_id_from_all = results[0].ingredient_id }
												}
											})

					//Update inventory using ingredient_id
					//UPDATE `table_name` SET `column_name` = `new_value' [WHERE condition];
					connection.query('UPDATE inventory SET amount = ? AND unit = ? WHERE user_id = ? AND ingredient_id = ?',
											[req.body.amount, req.body.unit, req.session.user_id, ingre_id_from_all], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send("Update success")//Update success
												}
											})
					}
})

//------------------------------------------------------------------------ Cookware ------------------------------------------------------------------------
//Get all available cookware of a particular user
app.get('/users/cookware', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
					connection.query('SELECT cookware_id, cookware_name FROM cookware WHERE user_id = ?',
											[req.session.user_id], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send(results)
												}
											})
					}
})


//Add cookware
app.post('/users/cookware/add', (req, res) => {
	if (!req.session.loggedin){
		res.status(404).send("You are not authorized in here.");
	}
	else{
						var cookware_exist = false;

						//Check for cookware existence in table
						connection.query('SELECT * FROM cookware LIMIT 1', function(error, results, fields) => {
										if (error) { throw error }
										else{
											if(results.length > 0){ cookware_exist = true }
										}
						})

						//If cookware exists
						if(cookware_exist){
									res.status(200).send("Cookware is in your inventory")
						}
						else{	//If cookware does not exist
						cookware_insert = [req.session.users_id,
															random.int(1000000, 100000000000),
															req.body.cookware_name]

						connection.query('INSERT INTO cookware (user_id, cookware_id, cookware_name) VALUES (?, ?, ?)',
														cookware_insert, function(error, results, fields) => {
															if (error) { throw error }
															else{
																res.status(200).send('Add Success')//Add Success
															}
														})

						}
	}
})


//Delete cookware
app.post('/users/cookware/delete', (req, res) => {
  if (!req.session.loggedin){
    res.status(404).send("You are not authorized in here.");
  }
  else{
					connection.query('DELETE FROM cookware WHERE user_id = ? AND cookware_name = ?',
											[req.session.user_id, req.body.cookware_name], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send('Delete Success');//Delete success
												}
											})
					}
})



app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
