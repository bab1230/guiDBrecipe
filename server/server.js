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
  // user_id: -1,
  // user_name: "",
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie  : { maxAge  :  86400 * 1000}
}

// console.log(sess.user_id)
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
    const userData = [req.body.first_name,
                    req.body.last_name,
                    req.body.user_name,
                    req.body.user_password]

    connection.query('INSERT INTO users (first_name, last_name, user_name, user_password) VALUES (?, ?, ?, ?)',
                    userData, function(err, result) {
                  if (err) throw err
                  else{
										console.log("user ", req.body.user_name, "created")
										res.status(200).send("user ", req.body.user_name, "created")
                  }
                })
})

//------------------------------------------------------------------------ Login ------------------------------------------------------------------------
app.post('/users/login', (req, res) => {
    var user_nameTemp = req.body.user_name
    var user_password = req.body.user_password
          if (user_nameTemp && user_password) {
                  connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?',
                                  [user_nameTemp, user_password], function(error, results, fields) {
                            if (results.length === 1) {
																var user_id_res = results[0].user_id.toString();
																console.log(user_id_res);
                                req.session.user_id = results[0].user_id;
                                console.log("Login Success!");
                                req.session.user_name = req.body.user_name;
                                req.session.loggedin = true;
																res.status(200).send(user_id_res)
                              } else {
                                res.status(400).send('Incorrect Username and/or Password!');
                                req.session.loggedin = false;
                              }
                            res.end();
                            });
          } else {
              res.status(400).send('Please enter Username and Password!');
              res.end();
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

//------------------------------------------------------------------------ Info -----------------------------------------------------------------------

app.get('/users/info', function(req, res) {

	console.log(parseInt(req.query.user_id, 10))
	var id_of_user = parseInt(req.query.user_id, 10);
		console.log("User ID is ", id_of_user);
				connection.query('SELECT user_id, first_name, last_name, user_name FROM users WHERE users.user_id = ?',
												[id_of_user], function(error, results, fields) {
									res.status(200).send(results);//This is an object
						});
})

//------------------------------------------------------------------------ Update Account -----------------------------------------------------------------------

app.post('/users/info/update', function(req, res) {
	console.log(parseInt(req.query.user_id, 10));//Change to body if needed
	var id_of_user = parseInt(req.query.user_id, 10);//Change to body if needed
	user_firstname_update = req.body.first_name_update;
	user_lastname_update = req.body.last_name_update;
	user_password_update = req.body.password_update;
	user_name_update = req.body.user_name_update;

	//UPDATE users SET user_password = 'test' WHERE user_id = 33771;
	//Update first_name
	//Update last_name
	//Update password

	//----------------------------------------------------- 4 -----------------------------------------------------
	if(user_firstname_update && user_lastname_update && user_password_update && user_name_update){//all three
		connection.query('UPDATE users SET user_name = ? , first_name = ? , last_name = ? , user_password = ? WHERE user_id = ?',
										[user_name_update, user_firstname_update, user_lastname_update, user_password_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}


	//----------------------------------------------------- 3 -----------------------------------------------------
	else if(user_lastname_update && user_password_update && user_name_update){//all three
			connection.query('UPDATE users SET user_name = ? , last_name = ? , user_password = ? WHERE user_id = ?',
											[user_name_update, user_lastname_update, user_password_update, id_of_user], function(error, results, fields) {
								res.status(200).send('Update successful');//This is an object
					});
	}
	else if(user_firstname_update && user_password_update && user_name_update){//all three
			connection.query('UPDATE users SET user_name = ? , first_name = ?, user_password = ? WHERE user_id = ?',
											[user_name_update, user_firstname_update, user_password_update, id_of_user], function(error, results, fields) {
								res.status(200).send('Update successful');//This is an object
					});
	}
	else if(user_firstname_update && user_lastname_update && user_name_update){//all three
			connection.query('UPDATE users SET user_name = ? , first_name = ? , last_name = ? WHERE user_id = ?',
											[user_name_update, user_firstname_update, user_lastname_update, id_of_user], function(error, results, fields) {
								res.status(200).send('Update successful');//This is an object
					});
	}
	else if(user_firstname_update && user_lastname_update && user_password_update){//all three
		connection.query('UPDATE users SET first_name = ? , last_name = ? , user_password = ? WHERE user_id = ?',
										[user_firstname_update, user_lastname_update, user_password_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}


	//----------------------------------------------------- 2 -----------------------------------------------------
	else if(user_lastname_update && user_password_update){//lastname and password
		connection.query('UPDATE users SET last_name = ? , user_password = ? WHERE user_id = ?',
										[user_lastname_update, user_password_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_firstname_update && user_lastname_update){//firstname and lastname
		connection.query('UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?',
										[user_firstname_update, user_lastname_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_firstname_update && user_password_update){//firstname and password
		connection.query('UPDATE users SET first_name = ? , user_password = ? WHERE user_id = ?',
										[user_firstname_update, user_password_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_name_update && user_password_update){//lastname and password
		connection.query('UPDATE users SET user_name = ? , user_password = ? WHERE user_id = ?',
										[user_name_update, user_password_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_lastname_update && user_name_update){//lastname and password
		connection.query('UPDATE users SET last_name = ? , user_name = ? WHERE user_id = ?',
										[user_lastname_update, user_name_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_name_update && user_firstname_update){//lastname and password
		connection.query('UPDATE users SET user_name = ? , first_name = ? WHERE user_id = ?',
										[user_name_update, user_firstname_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}

	//----------------------------------------------------- 1 -----------------------------------------------------
	else if(user_name_update){//password
		connection.query('UPDATE users SET user_name = ? WHERE user_id = ?',
										[user_name_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_firstname_update) {//firstname
		connection.query('UPDATE users SET first_name = ? WHERE user_id = ?',
										[user_firstname_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_lastname_update){//last name
		connection.query('UPDATE users SET last_name = ? WHERE user_id = ?',
										[user_lastname_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}
	else if(user_password_update){//password
		connection.query('UPDATE users SET user_password = ? WHERE user_id = ?',
										[user_password_update, id_of_user], function(error, results, fields) {
							res.status(200).send('Update successful');//This is an object
				});
	}

})


//------------------------------------------------------------------------ User Favorite ------------------------------------------------------------------------
//Response sends back an array of recipe_ID in favorites
//Account favorite recipes
app.get('/users/favorite', (req, res) => {
        console.log("User ID is ", parseInt(req.query.user_id, 10));
        connection.query('SELECT * FROM users JOIN favorites JOIN recipes ON users.user_id = favorites.user_id AND recipes.recipe_id = favorites.recipe_id WHERE users.user_id = ?',
                        [parseInt(req.query.user_id, 10)], function(error, results, fields) {
									let objectJavaScript = [];
                  for(var i = 0; i < results.length; i++){
											let responseToFrontend = {};
                      responseToFrontend[results[i].recipe_name] = results[i].how_to_cook;
											// objectJavaScript.push(responseToFrontend);
									}
									res.status(200).send(responseToFrontend);//This is an object
            });
})

//Delete recipes from favorite
app.post('/users/favorite/delete', (req, res) => {
    var recipeID = parseInt(req.body.recipe_id, 10);
        console.log("User ID is ", req.query.user_id);
        connection.query('DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?',
                        [parseInt(req.query.user_id, 10), recipeID], function(error, results, fields) {
									if(error) {throw error;}
									else{
                  res.status(200).send("Delete successful");}//This is an object
            });
})

//Add recipes to favorite
app.post('/users/favorite/add', (req, res) => {
	var recipeID = parseInt(req.body.recipe_id, 10);
        console.log("User ID is ", req.query.user_id);
        connection.query('INSERT INTO favorites VALUES (?, ?)',
                      [parseInt(req.query.user_id, 10), recipeID], function(error, results, fields) {
									if(error) {throw error;}
									else{
									res.status(200).send("Add successful");}//This is an object
            });
})


//------------------------------------------------------------------------ Pantry ingredients ------------------------------------------------------------------------
//Get all inventory of users
app.get('/users/pantry', (req, res) => {

		var inStock = {}
					connection.query('SELECT i.ingredient_id, ingredient_name, amount, unit FROM inventory i JOIN ingredient_all a ON i.ingredient_id = a.ingredient_id WHERE i.user_id = ?' ,
					[parseInt(req.query.user_id, 10)], function(error, results, fields) {
														if(error) {
															console.log('Error with GET ingredients query!');
															throw error
														}
														else{
															console.log('GET ingredients query success!');
						                  res.status(200).send(results);//This is an array
														}
													})
})




//Add inventory
app.post('/users/pantry/add', (req, res) => {
					var ingre_id_from_all = 0;
					console.log(ingre_id_from_all);
					//Get existing ingredient id from ingredient_all table
					connection.query('SELECT ingredient_id FROM ingredient_all WHERE ingredient_name = ? LIMIT 1',
											[req.body.ingredient_name], function(error, results, fields) {
												if(error) throw error
												else{
													console.log(req.body.ingredient_name);
													if(results.length > 0){ ingre_id_from_all =  results[0].ingredient_id, 10;
													ingre_id_from_all = parseInt(ingre_id_from_all, 10);
												 	}
												}

												if(ingre_id_from_all != 0)	{//If ingredient exists in ingredient_all table
																			user_add_inventory = [parseInt(req.query.user_id, 10), ingre_id_from_all, parseInt(req.body.amount, 10), req.body.unit]
																	        console.log("User ID is " + parseInt(req.query.user_id, 10) + " adds ingredient");
																	        connection.query('INSERT INTO inventory (user_id, ingredient_id, amount, unit) VALUES (?, ?, ?, ?)',
																	                         user_add_inventory, function(error, results, fields) {
																										if(error) {throw error;}
																										else{
																	                  res.status(200).send('Add Success');}//Add success
																	            });
																	}
												else{//If ingredient does not exist in ingredient_all table
													connection.query('INSERT INTO ingredient_all (ingredient_name) VALUES (?)',
																			[req.body.ingredient_name], function(error, results, fields) {
																				if(error) {throw error}
																				else{console.log('added to all');}
																			})

													//Get new ingredient id
													connection.query('SELECT ingredient_id FROM ingredient_all ORDER BY ingredient_id DESC LIMIT 1',
																			function(error, results, fields) {
																				if(error) throw error
																				else{
																					if(results.length > 0){ ingre_id_from_all = results[0].ingredient_id }
																				}
																			})
													//Insert into inventory
													user_add_inventory = [parseInt(req.query.user_id, 10), parseInt(ingre_id_from_all, 10), parseInt(req.body.amount, 10), req.body.unit]
													console.log("User ID is ", parseInt(req.query.user_id, 10) , " adds ingredient");
													connection.query('INSERT INTO inventory (user_id, ingredient_id, amount, unit) VALUES (?, ?, ?, ?)',
																					user_add_inventory, function(error, results, fields) {
																						if(error) {throw error;}
																						else{
																						res.status(200).send('Add Success');}//Add success
															});
					}
		})
})


//Delete inventory
app.post('/users/pantry/delete', (req, res) => {
	var ingre_id = 0;
	var ingre_name = req.body.ingredient_name;
	connection.query('SELECT * FROM ingredient_all WHERE ingredient_all.ingredient_name = ? LIMIT 1' , [ingre_name], function(error, results, fields) {
		if(error) throw error
		else{
			if(results.length > 0){ ingre_id = results[0].ingredient_id;}
		}
	});

					connection.query('DELETE FROM inventory WHERE user_id = ? AND ingredient_id = ?',
											[req.query.user_id, ingre_id], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send('Delete Success');//Delete success
												}
											});
})



//Update inventory ------ IN PROGRESS
app.post('/users/pantry/update', (req, res) => {
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
											[req.body.amount, req.body.unit, req.query.user_id, ingre_id_from_all], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send("Update success")//Update success
												}
											})
})

//------------------------------------------------------------------------ Cookware ------------------------------------------------------------------------
//Get all available cookware of a particular user
app.get('/users/cookware', (req, res) => {
					connection.query('SELECT cookware_id, cookware_name FROM cookware WHERE user_id = ?',
											[req.query.user_id], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send(results)
												}
											})
})


//Add cookware
app.post('/users/cookware/add', (req, res) => {
						var cookware_exist = false;

						//Check for cookware existence in table
						connection.query('SELECT * FROM cookware LIMIT 1', function(error, results, fields) {
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
						cookware_insert = [req.query.user_id,
															random.int(1000, 100000),
															req.body.cookware_name]

						connection.query('INSERT INTO cookware (user_id, cookware_id, cookware_name) VALUES (?, ?, ?)',
														cookware_insert, function(error, results, fields) {
															if (error) { throw error }
															else{
																res.status(200).send('Add Success')//Add Success
															}
														})

						}
})


//Delete cookware
app.post('/users/cookware/delete', (req, res) => {
					connection.query('DELETE FROM cookware WHERE user_id = ? AND cookware_name = ?',
											[req.query.user_id, req.body.cookware_name], function(error, results, fields) {
												if(error) throw error
												else{
													res.status(200).send('Delete Success');//Delete success
												}
											})
})


//------------------------------------ All Recipes ------------------------------------
app.get('/all_recipes',function(req,res){
  //about mysql query
  connection.query("SELECT * FROM recipes;",function (error,rows,fields) {
    //call back function
    if(!!error)
    {
      console.log("Error in query: SELECT * FROM users");
    }else {
      console.log("Success in query: SELECT * FROM users");
      //console.log(rows);
      res.send(rows)
      //console.log(rows);
    }
  });
})


app.get('/recipe', function(req,res){
	connection.query("SELECT r.recipe_id, recipe_name, how_to_cook, cuisine_type, image, rating_taste, rating_diff FROM recipes r JOIN ratings s ON r.recipe_id = s.rating_id WHERE r.recipe_id = " + req.query.recipe_id,
				function(error,rows,fields){
		if(!!error){
			console.log("Error in query: GET search");
		} else {
			console.log("Success in query: GET search");
			res.send(rows);
		}
	});
})

app.get('/recipe/ingredients', function(req,res){
	connection.query("SELECT recipe_id, i.ingredient_id, ingredient_name, amount, unit, notes FROM ingredient_recipe i JOIN ingredient_all a ON i.ingredient_id = a.ingredient_id WHERE recipe_id = " + req.query.recipe_id,
				function(error,rows,fields){
		if(!!error){
			console.log("Error in query: GET search");
		} else {
			console.log("Success in query: GET search");
			res.send(rows);
		}
	});
})

//	[req.query.recipe_name, req.query.recipe_name]
//-------------------------------- Searching ------------------------------------
app.get('/search', function(req,res){
	connection.query("SELECT recipes.recipe_id, recipe_name, how_to_cook, rating_taste FROM recipes JOIN ratings ON recipes.recipe_id = ratings.recipe_id WHERE recipes.cuisine_type LIKE '%" + req.query.recipe_name + "%' OR recipes.recipe_name LIKE '%" + req.query.recipe_name + "%'",
 	function(error,rows,fields){
		if(error){
			console.log("Error in query: GET searchByType");
		} else {
			console.log("Success in query: GET searchByType");
			res.status(200).send(rows);
		}
	});
})


//------------------------------------ Add Rating ------------------------------------
app.post('/rating/add', function(req, res) {
	var recipeID = parseInt(req.body.recipe_id, 10);
	var rating_diff = parseInt(req.body.rating_diff, 10);
	var rating_taste = parseInt(req.body.rating_taste, 10);
	rating_insert = [random.int(100,100000), recipeID, rating_taste, rating_diff];
	connection.query("INSERT INTO ratings (rating_id, recipe_id, rating_taste, rating_diff) VALUES (?, ?, ? , ?)", rating_insert,
 							function(error, results, fields) {
								if(error) throw error
								else{
									console.log('Insert Rating Success');
									res.status(200).send('Insert Rating Success');//INSERT success
								}
							})
})

//------------------------------------ All Ratings ------------------------------------

app.get('/rating',function(req,res){
	//about mysql query
	connection.query("SELECT ratings.rating_diff, ratings.rating_taste FROM ratings WHERE recipe_id = ?", req.query.recipe_id ,function (error,rows,fields) {
		//call back function
		if(!!error)
		{
			console.log("Error in query: SELECT * FROM ratings");
		} else {
			console.log("Success in query: SELECT * FROM ratings");
			//console.log(rows);
			objectJavaScript = {};
			rating_diff_arr = [];
			rating_taste_arr = [];
			for (var i = 0; i < rows.length; i++) {
				rating_diff_arr.push(rows[i].rating_diff);
				rating_taste_arr.push(rows[i].rating_taste);
			}
			objectJavaScript['rating_diff'] = rating_diff_arr;
			objectJavaScript['rating_taste'] = rating_taste_arr;
			res.status(200).send(objectJavaScript);
			//console.log(rows);
		}
	});
})


//---------------------------------------------------------------------------------
app.listen(port, () => {
	console.log("Server is running on port: " + port)
})
