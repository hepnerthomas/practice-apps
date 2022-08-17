import React from "react";

class GlossaryListComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {component, handleRemove, handleEdit} = this.props;
    return (
      <div key={component.word}>
        <li>
          <strong>{component.word}</strong> : <em>{component.description}</em>
          <button onClick={handleEdit} value={component.word}>Edit</button>
          <button onClick={handleRemove} value={component.word}>Delete</button>
        </li>
      </div>
    )
  }

}


export default GlossaryListComponent;