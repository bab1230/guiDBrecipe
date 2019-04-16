var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

const port = process.env.PORT || 4000;

//app.use(cookieParser());
app.use(bodyParser.json());
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("Server is running on port: " + port)
})