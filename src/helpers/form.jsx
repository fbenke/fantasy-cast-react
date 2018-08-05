import React from 'react';

export const renderField = (field) => {
  const { meta: { touched, error } } = field;
  const serverError = field[field.input.name];
  const isInvalid = (touched && error) || serverError;
  return (
    <fieldset className={`form-group ${isInvalid ? 'has-danger' : ''}`}>
      <label>
        {field.label}
      </label>
      <input
        {...field.input}
        type={field.type}
        className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
      />
      <div className="text-help">
        {touched && error ? error : serverError || ''}
      </div>
    </fieldset>
  );
};

export const renderTextArea = (field) => {
  const { meta: { touched, error } } = field;
  const serverError = field[field.input.name];
  const isInvalid = (touched && error) || serverError;
  return (
    <fieldset className={`form-group ${isInvalid ? 'has-danger' : ''}`}>
      <label>
        {field.label}
      </label>
      <textarea
        {...field.input}
        className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
        rows={field.rows}
        columns={field.columns}
      />
      <div className="text-help">
        {touched && error ? error : serverError || ''}
      </div>
    </fieldset>
  );
};

export const renderNonFieldErrors = (errors) => {
  if (errors && errors.non_field_errors) {
    return (
      <div className="alert alert-danger" id="non-field-errors">
        {errors.non_field_errors}
      </div>
    );
  }
  return <div />;
};

export const required = value => (
  value ? undefined : 'Required'
);

export const requiredArray = value => (
  value !== undefined && value.length > 0 ? undefined : 'Required'
);

export const passwordsMatch = (value, allValues) => (
  value !== allValues.password ? 'Passwords don\'t match' : undefined
);

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);
