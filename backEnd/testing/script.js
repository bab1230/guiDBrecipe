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

app.get('/jkjk',function(req,res){
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

app.listen(5000);