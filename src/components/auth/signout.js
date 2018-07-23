import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signoutUser } from '../../actions/auth'
import PropTypes from 'prop-types'

class Signout extends Component {
  componentDidMount () {
    this.props.signoutUser()
  }

  render () {
    return <div> Sorry to see you go .. </div>
  }
}

export default connect(null, { signoutUser })(Signout)

Signout.propTypes = {
  signoutUser: PropTypes.func,
}