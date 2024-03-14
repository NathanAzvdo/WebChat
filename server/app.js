const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const index = require("./routes/index");
const user = require("./routes/user");



const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8090;

app.listen(port, function (req, res) {
  console.log(`Server running on port: ${port}`);
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/webchat")
  .then(() => {
    console.log("Conected to database");
  })
  .catch((err) => {
    console.log("Error to connect to mongodb:" + err);
  });

app.use("/", index);
app.use("/users", user);

