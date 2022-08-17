require("dotenv").config();
const db = require('./db.js');
const express = require("express");
const path = require("path");

// set up port
process.env.PORT = process.env.PORT || 3000;

// Initialize app
const app = express();

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */

// get
app.get('/glossary', (req, res) => {
  // uses the getAll function
  db.getAll()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.sendStatus(404);
  });
})


// post
app.post('/glossary', (req, res) => {
  db.save(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    res.sendStatus(400);
  });

});


// delete
app.delete('/glossary', (req, res) => {
  console.log(req.body);
  db.remove(req.body)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    res.sendStatus(400);
  });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
