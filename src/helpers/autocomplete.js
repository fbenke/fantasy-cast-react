import React from 'react'
import Autocomplete from 'react-autocomplete'

export const renderAutocompleteField = field => {
  const { meta: { touched } } = field
  const serverError = touched && field.suggestions.length === 0 ? 'No matching movie title found' : ''
  const formError = touched && !field.isValid() ? 'Select a movie title' : ''
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
    field.setId(-1)
    if (value.length > 0) {
      field.getSuggestions(value)
    }
  }

  const onDropdownSelect = (value, item) => {
    field.input.onChange(value)
    field.setId(item.id)
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
