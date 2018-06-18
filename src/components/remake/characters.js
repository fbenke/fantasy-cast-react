import React from 'react'
import { Multiselect } from 'react-widgets'

export const renderCharacterField = field => {
  const { meta: { touched, error }, input, data } = field
  const formError = touched && error ? error : ''
  const className = `form-group ${formError ? 'has-danger' : ''}`

  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      <Multiselect {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []}
        data={data}
        textField={c => (`${c.character} (${c.actorName})`) }
      />
      <div className="text-help">
        { formError || '' }
      </div>
    </fieldset>
  )
}
