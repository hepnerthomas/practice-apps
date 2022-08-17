import React from "react";
import GlossaryListComponent from './GlossaryListComponent.jsx';

class GlossaryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var {glossary, handleRemove, handleEdit} = this.props;

    var glossaryListComponents = glossary.map((component) => {
      return <GlossaryListComponent
        key={component.word}
        component={component}
        handleRemove={handleRemove}
        handleEdit={handleEdit}
        />;
    });

    return (
      <div>
        <h2>Glossary</h2>
        {glossaryListComponents}
      </div>
    )
  }

}

export default GlossaryList;