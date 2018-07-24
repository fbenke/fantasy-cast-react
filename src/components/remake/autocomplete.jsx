import React from 'react';
import Autocomplete from 'react-autocomplete';

const renderAutocompleteField = (field) => {
  const serverError = field.suggestions.error ? 'No matching movie title found' : '';
  const formError = field.meta.touched && !field.isValid() ? 'Select a movie title' : '';
  const isInvalid = formError || serverError;

  const renderDropdownItem = (item, isHighlighted) => (
    <div
      className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
      key={item.id}
    >
      { `${item.name} (${item.type} from ${item.year})` }
    </div>
  );

  const onDropdownChange = (event, value) => {
    field.input.onChange(value);
    field.setId(-1);
    field.clearFields(false, false, field.dependentFields);
    if (value.length > 0) {
      field.getSuggestions(value);
    }
  };

  const onDropdownSelect = (value, item) => {
    field.input.onChange(value);
    field.setId(item.id);
    field.clearFields(false, false, field.dependentFields);
  };

  return (
    <fieldset className={`form-group ${isInvalid ? 'has-danger' : ''}`}>
      <label>
        {field.label}
      </label>
      <Autocomplete
        inputProps={{ className: `form-control ${isInvalid ? 'is-invalid' : ''}`, ...field.input }}
        wrapperStyle={{ display: 'block' }}
        value={field.input.value}
        items={field.suggestions.suggestions}
        getItemValue={item => `${item.name} (${item.type} from ${item.year})`}
        onSelect={onDropdownSelect}
        onChange={onDropdownChange}
        renderItem={renderDropdownItem}
        menuStyle={
          {
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: '90%',
            position: 'fixed',
            overflow: 'auto',
            maxHeight: '50%',
            zIndex: 1000,
          }
        }
      />
      <div className="text-help">
        { serverError || formError || '' }
      </div>
    </fieldset>
  );
};

export default renderAutocompleteField;
