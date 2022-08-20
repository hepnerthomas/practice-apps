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
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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

// get page results
app.post('/glossary/page', (req, res) => {
  // uses the getAll function
  console.log(req.body);
  var nPages = req.body.nPages;
  var currentPage = req.body.currentPage;
  console.log(nPages);
  console.log(currentPage);
  db.getPageResults(nPages, currentPage)
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
app.delete('/glossary/words/:word', (req, res) => {
  console.log("Request Params: ");
  console.log(req.params);
  // console.log("request body");
  // console.log(req.body);
  db.remove(req.params)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    res.sendStatus(400);
  });
});

// update
app.post('/glossary/update', (req, res) => {
  // console.log("request body");
  // console.log(req.body.original);
  // console.log(req.body.replacement);
  db.replace(req.body.original, req.body.replacement)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    res.sendStatus(400);
  });

});


// search
app.post('/glossary/search', (req, res) => {
  console.log("request body");
  console.log(req.body);
  db.search(req.body)
  .then((response) => {
    console.log("response: ");
    console.log(response);
    res.json(response);
  })
  .catch((err) => {
    res.sendStatus(400);
  });

});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
