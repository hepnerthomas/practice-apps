require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");
var cors = require('cors');

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Middleware to read request body
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Middleware CORS
var corsOptions = {
  origin: 'http://localhost:' + process.env.PORT + '/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */

// router to post user information to the database
app.post('/checkout', (req, res) => {
  // middleware: bodyParser and urlencoded
  // call asynchronous database method to add data from req.body to the server
  var userInfo = [req.session_id].concat(Object.values(req.body));
  console.log("User Info: ", userInfo);
  db.addUserAccountAsync(userInfo)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(400);
    })



    // return a 201 response
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
