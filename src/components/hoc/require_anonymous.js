import React, { Component } from 'react'
import { connect } from 'react-redux'

export default ChildComponent => {
  class Authentication extends Component {
    componentWillMount () {
      this.shouldNavigateAway()
    }

    componentWillUpdate () {
      this.shouldNavigateAway()
    }

    shouldNavigateAway () {
      if (this.props.authenticated) {
        this.props.history.push('/')
      }
    }

    render () {
      return <ChildComponent {...this.props} />
    }
  }

  function mapStateToProps (state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
