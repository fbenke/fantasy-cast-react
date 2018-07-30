import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/auth';

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

export default connect(null, authActions)(Signout);

Signout.propTypes = {
  signoutUser: PropTypes.func.isRequired,
};
