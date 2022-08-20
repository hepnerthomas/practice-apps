import React from 'react';

class Form2 extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleNext} = this.props;
    return (
      <div>
        <h3>Contact Information</h3>
        <form>
          <div>
            <label htmlFor="line1">Address: </label>
            <input placeholder="Line 1" type="text" id="line1"
                  name="line1" maxLength="30" size="30"></input>
            <input placeholder="Line 2" type="text" id="line2"
                  name="line2" maxLength="30" size="30"></input>
          </div>
          <div>
            <label htmlFor="city">City: </label>
            <input placeholder="City" type="text" id="city"
                  name="city" maxLength="30" size="30"></input>
            <label htmlFor="state">State: </label>
            <input placeholder="State" type="text" id="state"
                  name="state" maxLength="30" size="30"></input>
          </div>
          <div>
            <label htmlFor="zip">Zipcode: </label>
            <input placeholder="Zipcode" type="text" id="zip"
                  name="zip" maxLength="30" size="30"></input>
          </div>
          <div>
            <label htmlFor="phone">Phone Number: </label>
            <input placeholder="Phone Number" type="text" id="phone"
                  name="phone" maxLength="30" size="30"></input>
          </div>
          <input type="submit" value="Next" onClick={handleNext}></input>
      </form>
      </div>
    )
  }

}


export default Form2;