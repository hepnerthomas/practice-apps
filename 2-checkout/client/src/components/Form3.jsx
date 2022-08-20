import React from 'react';

class Form3 extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleNext} = this.props;
    return (
      <div>
        <h3>Payment Information</h3>
        <form>
          <div>
            <input placeholder="Credit Card Number" type="text" id="creditCard"
                  name="creditCard" maxLength="30" size="30"></input>
          </div>
          <div>
            <input placeholder="Expiry Date" type="text" id="expiry_date"
                  name="expiry_date" maxLength="5" size="30"></input>
          </div>
          <div>
            <input placeholder="CVV" type="text" id="cvv"
                  name="cvv" maxLength="3" size="30"></input>
          </div>
          <div>
            <input placeholder="Billing Zip Code" type="text" id="billingZipCode"
                  name="billingZipCode" maxLength="5" size="30"></input>
          </div>
          <input type="submit" value="Next" onClick={handleNext}></input>
        </form>
      </div>

    )
  }

}


export default Form3;