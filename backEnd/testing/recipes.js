var express = require ('express');
var mysql = require ('mysql');
var app = express();

var connection = mysql.createConnection({
  host: 'dbinstanceaws.cr1itmhwscoi.us-east-2.rds.amazonaws.com',
  user: 'dbteam',
  password: 'dbpassword',
  database: 'dbteam',
  port: '3306'
});

connection.connect(function (error) 
{
  if(!!error)
  {
    console.log("Failed Connecting to mysql");
  }
  else 
  {
    console.log("Connecting to mysql\n");
  }
});

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

app.get('/favorites', function(req, res){
  var user_id = 1;
  connection.query('SELECT r.recipe_id, recipe_name, cuisine_type, how_to_cook, image FROM favorites f JOIN recipes r ON r.recipe_id = f.recipe_id WHERE user_id = ' + user_id, function(error, rows, fields){
    if (!!error){
        console.log('Error with GET favorties query!')
    } else {
        console.log('GET favorites query success!');
        res.send(rows)
    }
  })
})

app.post('/favorites', function(req, res){
  var user_id = 1;
  var recipe_id = 5;
  connection.query('INSERT INTO favorites VALUES(' + user_id + ',' + recipe_id + ')', function(error, rows, fields){
    if (!!error){
        console.log('Error with POST favorites query!')
    } else {
        console.log('POST favorites query success!');
        res.send(rows)
    }
  })

})

app.get('/ingredients', function(req, res){
  var user_id = 1;
  connection.query('SELECT ingredient_id, ingredient_name, quantity, unit FROM inventory i JOIN ingredient_all a ON i.ingredient_id = a.ingredient_id WHERE i.user_id =' + user_id, function(error, rows, fields){
    if (!!error){
        console.log('Error with GET ingredients query!')
    } else {
        console.log('GET ingredients query success!');
        res.send(rows)
    }
  })
})

app.get('/cookware', function(req, res){
  var user_id = 1;
  connection.query('SELECT cookware_id, cookware_name FROM cookware WHERE user_id =' + user_id, function(error, rows, fields){
    if (!!error){
        console.log('Error with GET cookware query!')
    } else {
        console.log('GET cookware query success!');
        res.send(rows)
    }
  })
})

app.get('/trending', (req,res) => {
  var today = new Date().toJSON().slice(0,10);
  console.log(today);
//   connection.query('SELECT * FROM recipes WHERE featured_date = ' + today, function(error, results, fields) {
//   if (!!error){
//       console.log('Error with GET trending query!')
//   } else {
//       console.log('GET trending query success!');
//       res.send(rows)
//   }
// });
})


//search by recipe_name

//search by recipe/cuisine_type


app.listen(5000);