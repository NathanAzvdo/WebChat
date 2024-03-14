const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", function (req, res) {
    res.send('hello world')
  });


module.exports = router;