import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navigation extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/remakes/">Remakes</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/remakes/add/">Add a remake</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/signout/">Sign Out</Link>
        </li>
      ]
    }
    return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signup/">Sign Up</Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link className="nav-link" to="/signin/">Sign In</Link>
      </li>
    ]
  }

  render () {
    return (
      <nav className="nav">
        <Link className="navbar-brand" to="/">Home</Link>
        <ul className="nav justify-content-end">
          { this.renderLinks() }
        </ul>
      </nav>
    )
  }
}

function mapStateToProps (state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Navigation)
