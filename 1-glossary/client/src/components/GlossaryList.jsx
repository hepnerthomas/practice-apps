import React from "react";
import GlossaryListComponent from './GlossaryListComponent.jsx';

class GlossaryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var {glossary, searchText, handleRemove, handleEdit, handleDisplayGlossary} = this.props;

    var glossaryListComponents = glossary.map((component) => {
      return <GlossaryListComponent
        key={component.word}
        component={component}
        handleRemove={handleRemove}
        handleEdit={handleEdit}
        />;
    });

    if (searchText === '') {
      return (
        <div>
          <h2>Glossary</h2>
          {glossaryListComponents}
        </div>
      )
    } else {
      return (
        <div>
          <h2>Glossary</h2>
          <div>
            Displaying results for <em><strong>{searchText}</strong></em>.
            <button onClick={handleDisplayGlossary}>Display full glossary.</button>
          </div>
          {glossaryListComponents}
        </div>
      )
    }

  }

}

export default GlossaryList;