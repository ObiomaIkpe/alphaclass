const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/userController');


//later on we will add a middleware to check if the user is logged admin or not
router.get('/').get(getAllUsers);