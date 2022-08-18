import React from 'react';

class GlossaryPages extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {nPages, handleGetPageResults} = this.props;
    var pageButtons = [];
    for (let i = 1; i <= nPages; i++) {
      pageButtons.push(
        <button key={i} onClick={handleGetPageResults} value={i}>{i}
        </button>
      );
    }
    // console.log(pageButtons);
    return (
      <div>
        {pageButtons}
      </div>

    )
  }

}

export default GlossaryPages;