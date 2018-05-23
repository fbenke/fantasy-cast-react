import React from 'react'

export const renderField = field => {
  const { meta: { touched, error } } = field
  const serverError = field[field.input.name]
  const className = `form-group ${(touched && error) || serverError ? 'has-danger' : ''}`
  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      <input
        { ...field.input }
        type={field.type}
        className="form-control"
      />
      <div className="text-help">
        {touched && error ? error : serverError ? serverError : ''}
      </div>
    </fieldset>
  )
}

export const renderNonFieldErrors = errors => {
  if (errors && errors.non_field_errors) {
    return (
      <div className="alert alert-danger">
        {errors.non_field_errors}
      </div>
    )
  }
}

export const required = value => (value ? undefined : 'Required')
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
