import React from 'react';

class Confirmation extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleConfirmation, userInfo} = this.props;
    let keys = Object.keys(userInfo);
    let confirmationElements = keys.map((key) => {
      <div>{key}: {userInfo[key]}</div>
    })
    return (
      <div>
        <h3>Confirmation Details:</h3>
        {confirmationElements}
        <button>Submit</button>
      </div>

    )
  }

}


export default Confirmation;