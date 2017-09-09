import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import Login from './Login';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = { displaySignup: true };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  toggleDisplay() {
    this.setState({ displaySignup: !this.state.displaySignup });
  }

  render() {
    if(this.state.displaySignup) {
      return (
        <Signup toggleDisplay={this.toggleDisplay} />
      );
    } else {
      return (
        <Login toggleDisplay={this.toggleDisplay} />
      );
    }
  }
}


// Exporting named, unconnected component for testing purposes.
export { LandingPage };

// The default export is the connected component.
export default connect()(LandingPage);