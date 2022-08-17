require("dotenv").config();
const express = require("express");
const path = require("path");

// set up port
process.env.PORT = process.env.PORT || 3000;

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
