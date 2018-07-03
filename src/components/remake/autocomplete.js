import React from 'react'
import Autocomplete from 'react-autocomplete'

export const renderAutocompleteField = field => {
  const serverError = field.suggestions.error ? 'No matching movie title found' : ''
  const formError = field.meta.touched && !field.isValid() ? 'Select a movie title' : ''
  const isInvalid = formError || serverError

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
    field.setId(-1)
    field.clearFields(false, false, field.dependentFields)
    if (value.length > 0) {
      field.getSuggestions(value)
    }
  }

  const onDropdownSelect = (value, item) => {
    field.input.onChange(value)
    field.setId(item.id)
    field.clearFields(false, false, field.dependentFields)
  }

  return (
    <fieldset className={`form-group ${isInvalid ? 'has-danger' : ''}`}>
      <label>{field.label}</label>
      <Autocomplete
        inputProps={{ className: `form-control ${isInvalid ? 'is-invalid' : ''}`, ...field.input }}
        wrapperStyle={{ display: 'block' }}
        value={field.input.value}
        items={field.suggestions.suggestions}
        getItemValue={(item) => `${item.name} (${item.type} from ${item.year})`}
        onSelect={onDropdownSelect}
        onChange={onDropdownChange}
        renderItem={renderDropdownItem}
      />
      <div className="text-help">
        { serverError || formError || '' }
      </div>
    </fieldset>
  )
}
