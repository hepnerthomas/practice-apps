import React from "react";
const axios = require('axios');

// Import React Components
import GlossaryList from './GlossaryList.jsx';
import GlossaryForm from './GlossaryForm.jsx';
import GlossarySearch from './GlossarySearch.jsx';
import GlossaryPages from './GlossaryPages.jsx';

class Glossary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      glossary: [],
      glossaryPage: [],
      searchText: '',
      nPages: 1,
      currentPage: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDisplayGlossary = this.handleDisplayGlossary.bind(this);
    this.handleGetPageResults = this.handleGetPageResults.bind(this);
  }

  componentDidMount() {
    // axios get request
    axios.get('/glossary')
      .then((response) => {
        // console.log("Axios GET request: ");
        // console.log(response.data);
        this.setState({glossary: response.data});
        this.setState({glossaryPage: this.state.glossary.slice(0, 10)});
        var numPages = Math.ceil(this.state.glossary.length/10);
        this.setState({nPages: numPages});
        this.setState({currentPage: 1});
        // console.log("initial state set successfully!")
      })
      .catch((error) => {
        console.log(error);
      });
  }


  handleGetPageResults(event) {
    console.log("Page Clicked: ", event.target.value);
    axios.request({
      url: '/glossary/page',
      method: 'post',
      data: {
          "nPages": this.state.nPages,
          "currentPage": event.target.value
        }
    })
    .then((response) => {
      // console.log("Axios GET request: ");
      // console.log(response);
      this.setState({glossaryPage: response.data});
      this.setState({currentPage: event.target.value});
      // console.log("initial state set successfully!")
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleDisplayGlossary(event) {
    axios.get('/glossary')
    .then((response) => {
      // console.log("Axios GET request: ");
      // console.log(response.data);
      this.setState({glossary: response.data});
      this.setState({searchText: ''});
      var numPages = Math.ceil(this.state.glossary.length/10);
      this.setState({nPages: numPages});
      this.setState({currentPage: 1});
      // console.log("initial state set successfully!")
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("submitted form!");
    // console.log("word: ", event.target[0].value);
    // console.log("description: ", event.target[1].value);
    var word = event.target[0].value;
    var description = event.target[1].value;
    var input = {"word": word, "description": description};
    // console.log(input);
    axios.post('/glossary', input)
      .then((response) => {
        // console.log("Word saved to the glossary!");
        axios.get('/glossary')
          .then((response) => {
            // console.log("GET request success!");
            this.setState({glossary: response.data});
            // console.log('state updated successfully');
          })
      })
      .catch((error) => {
        console.log(error);
        alert(`The word, ${word},  already exists in the glossary. Please add a new word or edit the existing word in the glossary below!`);
      });

  }

  handleRemove(event) {
    // event.preventDefault();
    // console.log(event);
    var word = event.target.value;
    var input = {"word": event.target.value};
    // console.log(input);
    axios.delete('/glossary', {
      method: 'delete',
      data: input
    })
      .then((res) => {
        console.log(res);
        axios.get('/glossary')
          .then((response) => {
            // console.log(response.data);
            this.setState({glossary: response.data});
            // console.log(`successfully deleted word: ${event.target.value}!`);
          })
      })
      .catch((error) => {
        console.log(error);
      });
  }


  handleEdit(event) {
    var word = event.target.value;
    var description = window.prompt("Enter new description:");
    var input = {
      original:{"word": event.target.value},
      replacement:  {"word": event.target.value, "description": description}
    }
    console.log(input);
    axios.post('/glossary/update', input)
      .then((response) => {
        // console.log("Word saved to the glossary!");
        axios.get('/glossary')
          .then((response) => {
            // console.log("GET request success!");
            this.setState({glossary: response.data});
            // console.log('state updated successfully');
          })
      })
      .catch((error) => {
        console.log(error);
      });

  }


  handleSearch(event) {
    event.preventDefault();
    // console.log(event.target[0].value);
    console.log("submitted search query!");
    var input = {"word": event.target[0].value};
    console.log(input);
    axios.post('/glossary/search', input)
      .then((response) => {

        console.log(response);
        // Reset the glossary to only search results
        this.setState({glossary: response.data});

        // Reset everything else
        this.setState({
          glossaryPage: this.state.glossary.slice(0, 10),
          searchText: input.word,
          nPages: Math.ceil(this.state.glossary.length/10),
          currentPage: 1
        });
        // this.setState({searchText: input.word});
      })
      .catch((error) => {
        console.log(error);
      })

    // // Get all terms in glossary
    // var terms = this.state.glossary.map((component) => {
    //   return component.word;
    // })
    // console.log(terms);

    // // Get all descriptions in glossary
    // var descriptions = this.state.glossary.map((component) => {
    //   return component.description;
    // })
    // console.log(descriptions);

    // // Create a score for each compoent in glossary
    // var scores = this.state.glossary.map((component) => {
    //   return {"word": component.word, "score": 0};
    // })
    // console.log(scores);
  }

  render() {

    return (
      <div>
        <hr></hr>
        <br></br>
        <GlossarySearch handleSearch={this.handleSearch}/>
        <br></br>
        <hr></hr>
        <br></br>
        <GlossaryForm handleSubmit={this.handleSubmit}/>
        <br></br>
        <hr></hr>
        <br></br>
        <GlossaryList glossary={this.state.glossary}
                      glossaryPage={this.state.glossaryPage}
                      searchText={this.state.searchText}
                      handleRemove={this.handleRemove}
                      handleEdit={this.handleEdit}
                      handleDisplayGlossary={this.handleDisplayGlossary}
                      />
        <br></br>
        <hr></hr>
        <br></br>
        <GlossaryPages nPages={this.state.nPages} handleGetPageResults={this.handleGetPageResults}/>
        <br></br>
        <hr></hr>
        <br></br>
      </div>

    )
  }

}

export default Glossary;