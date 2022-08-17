const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/glossary-app')

// 2. Set up any schema and models needed by the app
const glossarySchema = new mongoose.Schema({
  word: String,
  description: String
});

// 3. Export the models
const Glossary = mongoose.model('Glossary', glossarySchema);

// // Load some example data to test
// var terms = require('../testData.json');
// console.log("Size of Dataset: ", terms.length);
// console.log(terms[0]);


// 4. Import the models into any modules that need them

// bulkSave

let bulkSave = (terms) => {
  // return Glossary.create(data);
  // let data = new Glossary(terms);
  return Glossary.create(terms)
    .then((response) => {
      console.log(response.data);
      console.log("success - loaded data to database!")
    })
    .catch((err) => {
      console.log(err);
      console.log("failed to save data to database;")
    });

}

// save
let save = (term) => {
  let data = new Glossary(term);
  return data.save();
}

// // Test bulk data load
// bulkSave(terms);

// search

// get
let getAll = () => {
  return Glossary.find();
}

module.exports = {bulkSave, save, getAll};