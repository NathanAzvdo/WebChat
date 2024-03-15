const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {registerUser, login, findUser, getUsers} = require('../controllers/userController')


router.post('/register', registerUser);
router.post('/login', login);
router.get('/findUser/:id', findUser)
router.get('/', getUsers)

module.exports = router;
