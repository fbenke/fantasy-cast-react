import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export default function (ComposedComponent, reverse) {
  class Authentication extends Component {
    componentWillMount () {
      if (!this.props.authenticated === !reverse) {
        this.props.history.push('/')
      }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.authenticated === !reverse) {
        this.props.history.push('/')
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps (state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(withRouter(Authentication))
}
