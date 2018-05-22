import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createRemake } from '../../actions'
import { required, renderField } from '../../helpers/form'

class RemakesNew extends Component {
  onSubmit (values) {
    this.props.createRemake(values, () => {
      this.props.history.push('/remakes/')
    })
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className="remakes-new">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            type="text"
            validate={required}
            component={renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/remakes/">Back</Link>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'RemakeNewForm'
})(
  connect(null, { createRemake })(RemakesNew)
)
