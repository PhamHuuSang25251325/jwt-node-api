
require('dotenv').config()
const express = require('express');
const route = express.Router();

const AuthController = require('../controllers/authController');
const {validateRegisterUser,validate} = require('../validator');

route.post('/api/register',validateRegisterUser(),validate,AuthController.register)
route.post('/api/login',AuthController.login)


module.exports = route;




