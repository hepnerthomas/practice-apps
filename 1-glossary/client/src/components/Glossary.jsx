import React from "react";
const axios = require('axios');

// Import React Components
import GlossaryList from './GlossaryList.jsx';
import GlossaryForm from './GlossaryForm.jsx';

class Glossary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      glossary: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // axios get request
    axios.get('/glossary')
      .then((response) => {
        console.log("Axios GET request: ");
        console.log(response.data);
        this.setState({glossary: response.data});
        console.log("initial state set successfully!")
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

  render() {

    return (
      <div>
        <hr></hr>
        <br></br>
        <GlossaryForm handleSubmit={this.handleSubmit}/>
        <br></br>
        <hr></hr>
        <br></br>
        <GlossaryList glossary={this.state.glossary}/>
        <br></br>
        <hr></hr>
        <br></br>
      </div>

    )
  }

}

export default Glossary;