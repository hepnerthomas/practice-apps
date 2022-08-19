import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: undefined,
        email: undefined,
        password: undefined,
        line1: undefined,
        line2: undefined,
        city: undefined,
        state: undefined,
        zipcode: undefined,
        phoneNumber: undefined,
        creditCard: undefined,
        expiry_date: undefined,
        cvv: undefined,
        billingZipCode: undefined
      },
      currentForm: 0
    }
  }

  render() {
    return (
      <button>Checkout</button>
    )
  }

}


export default App;