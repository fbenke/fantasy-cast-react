import React from 'react'
import Autocomplete from 'react-autocomplete'

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
        {touched && error ? error : serverError || ''}
      </div>
    </fieldset>
  )
}

export const renderTextArea = field => {
  const { meta: { touched, error } } = field
  const serverError = field[field.input.name]
  const className = `form-group ${(touched && error) || serverError ? 'has-danger' : ''}`
  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      <textarea
        { ...field.input }
        className="form-control"
        rows={field.rows}
        columns={field.columns}
      />
      <div className="text-help">
        {touched && error ? error : serverError || ''}
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
export const requiredArray = value => (value !== undefined && value.length > 0 ? undefined : 'Required')

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
