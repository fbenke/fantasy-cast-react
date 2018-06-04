import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signupUser } from '../../actions/auth'
import { email, required, renderField, renderNonFieldErrors } from '../../helpers/form'

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
          validate={required}
          component={renderField}
          props={this.props.serverErrors}
        />
        { renderNonFieldErrors(this.props.serverErrors) }
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

function validate (values) {
  const errors = {}

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors
}

function mapStateToProps (state) {
  return { serverErrors: state.auth.error }
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, { signupUser })(Signup)
)
