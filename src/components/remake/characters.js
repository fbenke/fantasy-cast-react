import React from 'react'
import { Multiselect } from 'react-widgets'
import { CHARACTER_LOADING } from '../../helpers/constants'

export const renderCharacterField = field => {
  const { meta: { touched, error }, input, data, state } = field
  const formError = touched && error ? error : ''
  const className = `form-group ${formError ? 'has-danger' : ''}`
  const inputElement = state === CHARACTER_LOADING ? (
    <Multiselect busy />
  ) : (
    <Multiselect {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []}
      data={data}
      textField={c => (`${c.character} (${c.actorName})`) }
    />
  )

  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      { inputElement }
      <div className="text-help">
        { formError || '' }
      </div>
    </fieldset>
  )
}
