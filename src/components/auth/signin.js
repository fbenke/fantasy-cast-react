import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signinUser } from '../../actions'
import { email, required, renderField } from '../../helpers/form'

class Signin extends Component {
  onSubmit (formProps) {
    this.props.signinUser(formProps, () => {
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
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'Signin'
})(
  connect(mapStateToProps, { signinUser })(Signin)
)
