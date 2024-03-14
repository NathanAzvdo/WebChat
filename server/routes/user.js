const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {registerUser} = require('../controllers/userController')


router.post('/register', registerUser)

module.exports = router;
