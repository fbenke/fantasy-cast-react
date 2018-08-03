import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

class Navigation extends Component {
  renderLinks() {
    const { authenticated } = this.props;
    if (authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/remakes/">
            Remakes
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/remakes/add/">
            Add a remake
          </Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/signout/">
            Sign Out
          </Link>
        </li>,
      ];
    }
    return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signup/">
          Sign Up
        </Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link className="nav-link" to="/signin/">
          Sign In
        </Link>
      </li>,
    ];
  }

  render() {
    return (
      <nav className="nav">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="nav justify-content-end">
          { this.renderLinks() }
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

Navigation.propTypes = propTypes;

export default connect(mapStateToProps)(Navigation);
