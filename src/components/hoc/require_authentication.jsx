import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ChildComponent) => {
  class Authentication extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { authenticated, history } = this.props;
      if (!authenticated) {
        history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
};
