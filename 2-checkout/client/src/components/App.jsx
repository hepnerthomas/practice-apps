import React from 'react';
import Form1 from './Form1.jsx'
import Form2 from './Form2.jsx'
import Form3 from './Form3.jsx'

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
      isCheckout: true,
      currentForm: undefined
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleForm1 = this.handleForm1.bind(this);
    this.handleForm2 = this.handleForm2.bind(this);
    this.handleForm3 = this.handleForm3.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
  }

  handleCheckout() {
    this.setState({isCheckout: false, currentForm: 1});
  }

  handleForm1(event) {
    event.preventDefault();
    var name = event.target.form[0].value;
    var email = event.target.form[1].value;
    var password = event.target.form[2].value;
    console.log(name, email, password)

    this.setState({currentForm: 2, name: name, email: email, password: password});
  }

  handleForm2(event) {
    event.preventDefault();
    var line1 = event.target.form[0].value;
    var line2 = event.target.form[1].value;
    var city = event.target.form[2].value;
    var state = event.target.form[3].value;
    var zipcode = event.target.form[4].value;
    var phoneNumber = event.target.form[5].value;

    console.log(line1, line2, city, state, zipcode, phoneNumber);

    this.setState({
        currentForm: 3,
        line1: line1,
        line2: line2,
        city: city,
        state: state,
        zipcode: zipcode,
        phoneNumber: phoneNumber
      });
  }

  handleForm3(event) {
    event.preventDefault();
    var cc = event.target.form[0].value;
    var expiryDate = event.target.form[1].value;
    var cvv = event.target.form[2].value;
    var billingZipCode = event.target.form[3].value;
    console.log(name, email, password)

    this.setState({
      currentForm: undefined,
      isCheckout: true,
      creditCard: cc,
      expiryDate: expiryDate,
      CVV: cvv,
      billingZipCode: billingZipCode
    });
  }

  handleConfirmation(event) {
    event.preventDefault();
  }

  render() {
    // start with checkout
    if (this.state.isCheckout === true) {
      return (<div><button onClick={this.handleCheckout}>Checkout</button></div>)

    // render first form
    } else if (this.state.currentForm === 1) {
      console.log("Form 1:");
      return (
        <Form1 handleNext={this.handleForm1}/>
      )

    // render second form
    } else if (this.state.currentForm === 2) {
      console.log("Form 2:");
      return (
        <Form2 handleNext={this.handleForm2}/>
      )

    // render third form
    } else if (this.state.currentForm === 3) {
      console.log("Form 3:");
      return (
        <Form3 handleNext={this.handleForm3}/>
      )
    }

    else if (this.state.currentForm === 4) {
      console.log("Confirmation:");
      return (
        <Form3 handleConfirmation={this.handleConfirmation}/>
      )
    }



  }

}


export default App;