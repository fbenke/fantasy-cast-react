import React, { Component } from 'react'

export const renderField = field => {
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

export const required = value => (value ? undefined : 'Required')
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
