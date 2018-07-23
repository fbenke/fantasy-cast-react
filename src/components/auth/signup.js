import React, { Component } from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signupUser } from '../../actions/auth'
import {
  email, required, renderField,
  renderNonFieldErrors, passwordsMatch
} from '../../helpers/form'
import PropTypes from 'prop-types'

class Signup extends Component {
  onSubmit (formProps) {
    this.props.signupUser(formProps, () => {
      this.props.history.push('/remakes/')
    })
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="text"
          validate={[required, email]}
          component={renderField}
          props={this.props.serverErrors}
        />
        <Field
          label="Username"
          name="username"
          type="text"
          validate={required}
          component={renderField}
          props={this.props.serverErrors}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          validate={required}
          component={renderField}
          props={this.props.serverErrors}
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          validate={[required, passwordsMatch]}
          component={renderField}
          props={this.props.serverErrors}
        />
        { renderNonFieldErrors(this.props.serverErrors) }
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return { serverErrors: state.auth.errors }
}

export default compose(
  connect(mapStateToProps, { signupUser }),
  reduxForm({ form: 'Signup' })
)(Signup)


Signup.propTypes = {
  handleSubmit: PropTypes.func,
  serverErrors: PropTypes.object,
  signupUser: PropTypes.func,
  history: PropTypes.object
}