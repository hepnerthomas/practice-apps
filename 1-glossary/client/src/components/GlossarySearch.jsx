import React from 'react';

class GlossarySearch extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {handleSearch} = this.props;
    return (
      <div>
        <h2>Glossary Search</h2>
        <form onSubmit={handleSearch}>
          <input type="text" id="search" name="search" maxLength="100" size="70"></input>
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }

}

export default GlossarySearch;