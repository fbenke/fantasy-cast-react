import React from 'react';
import { Multiselect } from 'react-widgets';
import { CHARACTER_LOADING, TMDB_ACTOR_PROFILE_PATH } from '../../helpers/constants';

const renderCharacterField = (field) => {
  const {
    meta: { touched, error }, input, data, state,
  } = field;
  const formError = touched && error ? error : '';
  const className = `form-group ${formError ? 'has-danger' : ''}`;

  const renderListItem = ({ item }) => (
    <span>
      <strong>
        {item.character}
      </strong>
      {` , ${item.actorName}`}
      { item.tmdbProfilePath !== ''
        && (
          <img
            className="actor-icon"
            src={`${TMDB_ACTOR_PROFILE_PATH}${item.tmdbProfilePath}`}
            alt={item.actorName}
          />
        )
      }
    </span>
  );

  const inputElement = state === CHARACTER_LOADING ? (
    <Multiselect busy />
  ) : (
    <Multiselect
      {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []}
      data={data}
      textField="character"
      itemComponent={renderListItem}
    />
  );

  return (
    <fieldset className={className}>
      <label>
        {field.label}
      </label>
      { inputElement }
      <div className="text-help">
        { formError || '' }
      </div>
    </fieldset>
  );
};

export default renderCharacterField;
