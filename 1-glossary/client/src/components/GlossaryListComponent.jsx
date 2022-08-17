import React from "react";

class GlossaryListComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {component, handleRemove} = this.props;
    return (
      <div key={component.word}>
        <li>
          <strong>{component.word}</strong> : <em>{component.description}</em>
          <button>Edit</button>
          <button onClick={handleRemove} value={component.word}>Delete</button>
        </li>
      </div>
    )
  }

}


export default GlossaryListComponent;