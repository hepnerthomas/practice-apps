import React from 'react';

class Confirmation extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleConfirmation, userInfo} = this.props;
    let keys = Object.keys(userInfo);
    console.log("Keys: ", keys);
    let confirmationElements = keys.map((key) => {
      return <div key={key}>{key}: {userInfo[key]}</div>;
    })
    console.log("confirmation elements: ", confirmationElements);
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