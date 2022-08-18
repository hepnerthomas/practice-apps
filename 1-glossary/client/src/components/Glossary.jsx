import React from "react";
const axios = require('axios');

// Import React Components
import GlossaryList from './GlossaryList.jsx';
import GlossaryForm from './GlossaryForm.jsx';
import GlossarySearch from './GlossarySearch.jsx';

class Glossary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      glossary: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // axios get request
    axios.get('/glossary')
      .then((response) => {
        // console.log("Axios GET request: ");
        // console.log(response.data);
        this.setState({glossary: response.data});
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
    console.log(event.target[0].value);
    console.log("submitted search query!");

    // Get all terms in glossary
    var terms = this.state.glossary.map((component) => {
      return component.word;
    })
    console.log(terms);

    // Get all descriptions in glossary
    var descriptions = this.state.glossary.map((component) => {
      return component.description;
    })
    console.log(descriptions);

    // Create a score for each compoent in glossary
    var scores = this.state.glossary.map((component) => {
      return {"word": component.word, "score": 0};
    })
    console.log(scores);
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
                      handleRemove={this.handleRemove}
                      handleEdit={this.handleEdit}
                      />
        <br></br>
        <hr></hr>
        <br></br>
      </div>

    )
  }

}

export default Glossary;