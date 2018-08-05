import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from 'actions/auth';

const propTypes = {
  signoutUser: PropTypes.func.isRequired,
};

class Signout extends Component {
  componentDidMount() {
    const { signoutUser } = this.props;
    signoutUser();
  }

  render() {
    return (
      <div>
        Sorry to see you go ..
      </div>
    );
  }
}

Signout.propTypes = propTypes;

export default connect(null, authActions)(Signout);
