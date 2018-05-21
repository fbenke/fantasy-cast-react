import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class Signin extends Component {
  onSubmit ({ email, password }) {
    console.log(email, password)
  }

  renderField (field) {
    return (
      <fieldset className="form-group">
        <label>{field.label}</label>
        <input
          { ...field.input }
          type="text"
          className="form-control"
        />
      </fieldset>
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          component={this.renderField}
        />
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'Signin'
})(Signin)
