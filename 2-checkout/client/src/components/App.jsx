import React from 'react';
import Form1 from './Form1.jsx'
import Form2 from './Form2.jsx'
import Form3 from './Form3.jsx'
import Confirmation from './Confirmation.jsx'
const axios = require('axios');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      billingZipCode: undefined,

      isCheckout: true,
      currentForm: undefined
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
  }

  // helper function
  handleFormSubmit(event) {
    event.preventDefault();
    // console.log("Input Change in Progress: ");
    const target = event.target.form;
    // const value = target.value;
    // const name = target.name;

    for (let i = 0; i < target.length - 1; i++) {
      // console.log(target[i]);
      let name = target[i].name;
      let value = target[i].value;
      // console.log(name);
      // console.log(value);
      this.setState({
        [name]: value
      });
    }
    // console.log(this.state);
    var currentForm = this.state.currentForm + 1;
    this.setState({
      currentForm: currentForm
    });

  }


  handleCheckout() {
    this.setState({isCheckout: false, currentForm: 1});
  }


  handleConfirmation(event) {
    event.preventDefault();
    // isCheckout: true,
    // console.log(event)
    // var data = this.state.userInfo;
    // data.zipcode = parseInt(data.zipcode);
    // data.cvv = parseInt(data.cvv);
    // data.billingZipCode = parseInt(data.billingZipCode);
    // console.log(data.zipcode, data.cvv, data.billingZipCode);
    // console.log(data);
    // console.log('do I get here?');
    var data = this.state;
    delete data['isCheckout'];
    delete data['currentForm'];
    data.zipcode = parseInt(data.zipcode);
    data.cvv = parseInt(data.cvv);
    data.billingZipCode = parseInt(data.billingZipCode);
    // console.log(data);

    axios.post('/checkout', data)
      .then((response) => {
        console.log("SUCCESS: Submitted form data to the database.");
      })
      .catch((err) => {
        console.log("FAIL: Did not submit form data to the database.");
      });

    this.setState({
      currentForm: undefined, isCheckout: true
    });



  }

  render() {
    // start with checkout
    if (this.state.isCheckout === true) {
      return (<div><button onClick={this.handleCheckout}>Checkout</button></div>)

    // render first form
    } else if (this.state.currentForm === 1) {
      console.log("Form 1:");
      // console.log(this.state);
      return (
        <Form1 handleNext={this.handleFormSubmit}/>
      )

    // render second form
    } else if (this.state.currentForm === 2) {
      console.log("Form 2:");
      // console.log(this.state);
      return (
        <Form2 handleNext={this.handleFormSubmit}/>
      )

    // render third form
    } else if (this.state.currentForm === 3) {
      console.log("Form 3:");
      // console.log(this.state);
      return (
        <Form3 handleNext={this.handleFormSubmit}/>
      )


    } else if (this.state.currentForm === 4) {
      console.log("Confirmation:");
      // console.log(this.state);
      return (
        <Confirmation handleConfirmation={this.handleConfirmation}
                      userInfo={this.state}/>
      )
    }



  }

}


export default App;