const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/glossary-app')

// 2. Set up any schema and models needed by the app
const glossarySchema = new mongoose.Schema({
  word: {type: String, unique: true},
  description: String
});

// 3. Export the models
const Glossary = mongoose.model('Glossary', glossarySchema);

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
  // return data.save(function(err) {
  //   if (err) {
  //     console.log(err);
  //     console.log("failed to save data to database;")
  //   } else {
  //     console.log("successfully loaded to database.")
  //   }
  // });
}

// // Test bulk data load
// Load some example data to test
// var terms = require('../testData.json');
// console.log("Size of Dataset: ", terms.length);
// console.log(terms[0]);

// bulkSave(terms);

// search

// get
let getAll = () => {
  return Glossary.find().sort({'word': 'asc', 'description': 'asc'});
}


let getPageResults = (nPages, currentPage) => {
  return Glossary
        .find()
        .sort({'word': 'asc', 'description': 'asc'})
        .skip( currentPage > 0 ? ( ( currentPage - 1 ) * 10 ) : 0 )
        .limit(10);
}

// remove/delete
let remove = (term) => {
  return Glossary.deleteOne(term);
}

// edit an entry
// let replace = (filter, replacement) => {
  let replace = (word, description) => {
  var filter = {"word": word};
  var replacement = {"word": word, "description": description};
  return Glossary.findOneAndReplace(filter, replacement);
}


// search words and descriptions
let search = (input) => {
  var searchText = input.word;
  return Glossary.find( {'word': { $regex: searchText, $options: 'i' } } )
                 .sort({'word': 'asc', 'description': 'asc'});
                //  .limit(10);
}

module.exports = {bulkSave, save, getAll, remove, replace, search, getPageResults};