import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signupUser } from '../../actions'
import { email, required, renderField } from '../../helpers/form'

class Signup extends Component {
  onSubmit (formProps) {
    this.props.signupUser(formProps, () => {
      this.props.history.push('/remakes/')
    })
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      )
    }
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
        />
        <Field
          label="Password"
          name="password"
          type="password"
          validate={required}
          component={renderField}
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          validate={required}
          component={renderField}
        />
        { this.renderAlert() }
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
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, { signupUser })(Signup)
)
