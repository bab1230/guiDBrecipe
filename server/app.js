const express = require('express');
const mysql = require('mysql');
const app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

const port = 3000;

var connection = mysql.createConnection({
    host: 'dbinstanceaws.cr1itmhwscoi.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbteam',
    password: 'dbpassword',
    database: 'dbteam'
});



app.get('/Database_Concept', (req, res) =>{
    connection.query('SELECT * FROM users', (error, Database_Concept) => {
    if (error) {
      res.send('An error occurred while executing the query');
      throw error;
    }
    else{
      res.json(Database_Concept);
    }
  });
});

app.use('/static', express.static('public'));

app.get('/user', (req, res) => {
 res.send('<h1>Hello World</h1>');
 console.log('Incoming request');
});

app.post('/user', (req, res) => {
 res.send('<h1>Hello Post Request</h1>');
 console.log('Incoming request');
});

app.get('/user/:userid', (req, res) => {
  // res.send('{"name":"Skyler Tran","id":"47630912"}');
  res.send(req.params);
});

app.get('/user/:userid/range/:from-:to', (req, res) => {
  res.send(req.params);
});

app.get('/data', (req, res) => {
  res.send(req.query);
});

app.get('/', function (req, res) {
    res.sendFile('login.html', { root: __dirname });
});
//app.get('/usr/:userid/newrange/from/:fromTS/to/:toTS')
app.listen(port, () => {
 console.log('Simple Example');
});
