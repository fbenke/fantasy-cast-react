import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default ChildComponent => {
  class Authentication extends Component {
    componentDidMount () {
      this.shouldNavigateAway()
    }

    componentDidUpdate () {
      this.shouldNavigateAway()
    }

    shouldNavigateAway () {
      if (!this.props.authenticated) {
        this.props.history.push('/')
      }
    }

    render () {
      return <ChildComponent {...this.props} />
    }
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool,
    history: PropTypes.object
  }

  function mapStateToProps (state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
