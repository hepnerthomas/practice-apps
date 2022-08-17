import React from "react";
const axios = require('axios');
import GlossaryListComponent from './GlossaryListComponent.jsx';

class GlossaryList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      glossary: []
    };
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

  // getGlossary() {

  // }

  render() {
    var glossaryListComponents = this.state.glossary.map((component) => {
      return <GlossaryListComponent key={component.word} component={component}/>;
    });

    return (
      <div>{glossaryListComponents}</div>

    )
  }

}

export default GlossaryList;