import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signinUser } from '../../actions'
import { email, required, renderField, renderNonFieldErrors } from '../../helpers/form'

class Signin extends Component {
  onSubmit (formProps) {
    this.props.signinUser(formProps, () => {
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
        { renderNonFieldErrors(this.props.serverErrors) }
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return { serverErrors: state.auth.error }
}

export default reduxForm({
  form: 'Signin'
})(
  connect(mapStateToProps, { signinUser })(Signin)
)
