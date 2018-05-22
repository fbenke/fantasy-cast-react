import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signupUser } from '../../actions'

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

  renderField (field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <fieldset className={className}>
        <label>{field.label}</label>
        <input
          { ...field.input }
          type={field.type}
          className="form-control"
        />
        <div className="text-help">
          {touched && error ? error : ''}
        </div>
      </fieldset>
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

function validate (values) {
  const errors = {}

  // TODO: make this DRYer
  if (!values.email) {
    errors.email = 'Enter a email!'
  }

  if (!values.password) {
    errors.password = 'Enter a password!'
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Enter a password confirmation!'
  }

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
