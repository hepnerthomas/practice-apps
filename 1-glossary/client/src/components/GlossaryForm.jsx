import React from "react";


class GlossaryForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <h2>Glossary Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="word">Word: </label>
          <input type="text" id="word" name="word" maxLength="45"></input>
          <label htmlFor="description">Description: </label>
          <input type="text" id="description" name="description" maxLength="280"></input>
          <button type="submit">Submit!</button>
        </form>


      </div>
    )
  }

}

export default GlossaryForm;