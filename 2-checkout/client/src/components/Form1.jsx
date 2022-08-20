import React from 'react';

class Form1 extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleNext} = this.props;
    return (
      <div>
        <h3>Account Details</h3>
        <form>
          <div>
            <label htmlFor="name">Name: </label>
            <input placeholder="Enter your name." type="text" id="name"
                  name="name" required maxLength="30" size="30"></input>
          </div>
          <div>
          <label htmlFor="email">Email: </label>
            <input placeholder="Enter your email address." type="email" id="email"
                  name="email" maxLength="30" size="30" required></input>
          </div>
          <div>
          <label htmlFor="password">Password: </label>
            <input placeholder="Enter your password." type="password" id="password" name="password"
                  maxLength="60" size="30" required></input>
          </div>
          <input type="submit" value="Next" onClick={handleNext}></input>
      </form>
      </div>
    )
  }

}


export default Form1;