const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const withAuth = require('../MiddleMan');
const User = require("../recipeProfile")
var app = express();

process.env.SECRET_KEY = 'secret'

//More to come



module.exports = recipes