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
    this.handleForm1 = this.handleForm1.bind(this);
    this.handleForm2 = this.handleForm2.bind(this);
    this.handleForm3 = this.handleForm3.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // helper function
  handleInputChange(event) {
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
  }


  handleCheckout() {
    this.setState({isCheckout: false, currentForm: 1});
  }

  handleForm1(event) {
    event.preventDefault();
    // console.log("Handle Form in Progress: ");
    // console.log(event.target.form[0]);
    // console.log(event.target.form[1]);
    // console.log(event.target.form[2]);

    // var name = event.target.form[0].value;
    // var email = event.target.form[1].value;
    // var password = event.target.form[2].value;

    // console.log(name, email, password)
    this.handleInputChange(event);


    this.setState({currentForm: 2});
    // console.log(this.state);

    // this.setState({
    //   currentForm: 2,
    //   userInfo: {
    //     name: name,
    //     email: email,
    //     password: password,
    //     // line1: undefined, line2: undefined, city: undefined, state: undefined, zipcode: undefined, phoneNumber: undefined, creditCard: undefined, expiry_date: undefined,cvv: undefined, billingZipCode: undefined
    //   }
    // });
  }

  handleForm2(event) {
    event.preventDefault();
    this.handleInputChange(event);
    this.setState({currentForm: 3});

    // var line1 = event.target.form[0].value;
    // var line2 = event.target.form[1].value;
    // var city = event.target.form[2].value;
    // var state = event.target.form[3].value;
    // var zipcode = event.target.form[4].value;
    // var phoneNumber = event.target.form[5].value;

    // console.log(line1, line2, city, state, zipcode, phoneNumber);

    // this.setState({
    //     currentForm: 3,
    //     userInfo: {
    //       name: this.state.userInfo.name,
    //       email: this.state.userInfo.email,
    //       password: this.state.userInfo.password,
    //       line1: line1,
    //       line2: line2,
    //       city: city,
    //       state: state,
    //       zipcode: zipcode,
    //       phoneNumber: phoneNumber
    //     }

    //   });
  }

  handleForm3(event) {
    event.preventDefault();
    this.handleInputChange(event);
    this.setState({currentForm: 4});
    // console.log(event.target.form);
    // var cc = event.target.form[0].value;
    // var expiryDate = event.target.form[1].value;
    // var cvv = event.target.form[2].value;
    // var billingZipCode = event.target.form[3].value;
    // console.log(cc, expiryDate, cvv, billingZipCode)

    // this.setState({
    //   currentForm: 4,
    //   userInfo: {
    //     name: this.state.userInfo.name,
    //     email: this.state.userInfo.email,
    //     password: this.state.userInfo.password,
    //     line1: this.state.userInfo.line1,
    //     line2: this.state.userInfo.line2,
    //     city: this.state.userInfo.city,
    //     state: this.state.userInfo.state,
    //     zipcode: this.state.userInfo.zipcode,
    //     phoneNumber: this.state.userInfo.phoneNumber,
    //     creditCard: cc,
    //     expiryDate: expiryDate,
    //     cvv: cvv,
    //     billingZipCode: billingZipCode
    //   }

    // });
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
    console.log('do I get here?');
    var data = this.state;
    delete data['isCheckout'];
    delete data['currentForm'];
    data.zipcode = parseInt(data.zipcode);
    data.cvv = parseInt(data.cvv);
    data.billingZipCode = parseInt(data.billingZipCode);
    console.log(data);

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
      console.log(this.state);
      return (
        <Form1 handleNext={this.handleForm1}/>
      )

    // render second form
    } else if (this.state.currentForm === 2) {
      console.log("Form 2:");
      console.log(this.state);
      return (
        <Form2 handleNext={this.handleForm2}/>
      )

    // render third form
    } else if (this.state.currentForm === 3) {
      console.log("Form 3:");
      console.log(this.state);
      return (
        <Form3 handleNext={this.handleForm3}/>
      )


    } else if (this.state.currentForm === 4) {
      console.log("Confirmation:");
      console.log(this.state);
      return (
        <Confirmation handleConfirmation={this.handleConfirmation}
                      userInfo={this.state}/>
      )
    }



  }

}


export default App;