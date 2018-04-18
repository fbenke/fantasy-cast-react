import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createRemake } from '../actions'

// TODO: refactor as soon as we have more fields

class RemakeNew extends Component {
  onSubmit (values) {
    this.props.createRemake(values, () => {
      this.props.history.push('/')
    })
  }

  renderField (field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/">Back</Link>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Enter a title!'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'RemakeNewForm'
})(
  connect(null, { createRemake })(RemakeNew)
)
