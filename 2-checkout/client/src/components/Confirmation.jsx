import React from 'react';

class Confirmation extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleConfirmation, userInfo} = this.props;
    delete userInfo['isCheckout'];
    delete userInfo['currentForm']
    let keys = Object.keys(userInfo);
    // let values = Object.values(userInfo);
    // console.log("Keys: ", keys);
    // console.log("Values: " , values)
    let confirmationElements = keys.map((key) => {
      return <div key={key}>{key}: {userInfo[key]}</div>;
    })
    // console.log("confirmation elements: ", confirmationElements);
    return (
      <div>
        <h3>Confirmation Details:</h3>
        {confirmationElements}
        <button type="submit" onClick={handleConfirmation}>Purchase</button>
      </div>

    )
  }

}


export default Confirmation;