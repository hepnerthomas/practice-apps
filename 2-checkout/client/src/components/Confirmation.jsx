import React from 'react';

class Confirmation extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleConfirmation} = this.props;
    return (
      <div>Confirmation</div>
    )
  }

}


export default Confirmation;