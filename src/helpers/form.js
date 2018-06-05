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

export const renderAutocompleteField = field => {
  const { meta: { touched, error } } = field
  const serverError = touched && field.suggestions.length === 0 ? 'No matching movie title found' : ''
  const formError = touched && !field.isMovieIdValid() ? 'Select a movie title' : ''
  const className = `form-group ${formError || serverError ? 'has-danger' : ''}`

  const renderDropdownItem = (item, isHighlighted) => {
    return (
      <div
        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
        key={item.id}
      >
        { `${item.name} (${item.type} from ${item.year})` }
      </div>
    )
  }

  const onDropdownChange = (event, value) => {
    field.input.onChange(value)
    field.setMovieId(-1)
    if (value.length > 0) {
      field.getSuggestions(value)
    }
  }

  const onDropdownSelect = (value, item) => {
    field.input.onChange(value)
    field.setMovieId(item.id)
  }

  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      <Autocomplete
        inputProps={{ className: 'form-control', ...field.input }}
        wrapperStyle={{ display: 'block' }}
        value={field.input.value}
        items={field.suggestions}
        getItemValue={(item) => `${item.name} (${item.type} from ${item.year})`}
        onSelect={onDropdownSelect}
        onChange={onDropdownChange}
        renderItem={renderDropdownItem}
      />
      <div className="text-help">
        { formError || serverError || '' }
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
