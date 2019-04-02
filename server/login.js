var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var crypto = require('crypto');

var app = express();

const port = 3000;

var connection = mysql.createConnection({
    host: 'dbinstanceaws.cr1itmhwscoi.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbteam',
    password: 'dbpassword',
    database: 'dbteam'
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  if (request.session.loggedin){
    response.send('You are ' + request.session.username + '<h1>Log out to see this page.</h1>')
  }
  else{
	  response.sendFile(path.join(__dirname + '/login.html'));
   }
});


app.post('/auth', function(request, response) {
    	var username = request.body.username;
    	var password = request.body.password;
    	if (username && password) {
    		connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?', [username, password], function(error, results, fields) {
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
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

var auth = function(req, res, next) {
  if (req.session && request.session.loggedin)
    return next();
  else
    return res.sendStatus(401);
};

// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(port);
