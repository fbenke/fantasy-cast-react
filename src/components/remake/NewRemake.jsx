import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import * as remakeActions from '../../actions/remake';
import * as movieActions from '../../actions/movie';
import {
  required, renderField, renderTextArea, requiredArray,
} from '../../helpers/form';
import * as c from '../../helpers/constants';
import renderAutocompleteField from './renderAutocompleteField';
import renderCharacterField from './renderCharacterField';
import TmdbInfo from './TmdbInfo';

class NewRemake extends Component {
  constructor(props) {
    super(props);
    const { fetchMovieSuggestions } = this.props;
    this.getSuggestions = _.debounce((value) => {
      fetchMovieSuggestions(value);
    }, 200);
    this.isMovieValid = this.isMovieValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { resetMovieSuggestions } = this.props;
    resetMovieSuggestions();
  }

  onSubmit(values) {
    const {
      createRemake, newRemake: { imdbId }, tmdbInfo: { tmdbId }, history,
    } = this.props;
    if (this.isMovieValid()) {
      createRemake({
        ...values,
        movie: imdbId,
        tmdbId,
      },
      () => {
        history.push('/remakes/');
      });
    }
  }

  isMovieValid() {
    const { newRemake: { imdbId } } = this.props;
    return imdbId !== -1;
  }

  render() {
    const {
      handleSubmit, clearFields, suggestions, setImdbId,
      newRemake: { availableCharacters, characterState },
      tmdbInfo,
    } = this.props;
    return (
      <div>
        <h1>
          Which movie would you like to recast?
        </h1>
        <div className="row remakes-new">
          <div className="col-md-7 offset-md-1">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Field
                label="Title"
                name="title"
                type="text"
                validate={required}
                component={renderField}
              />
              <Field
                label="Description"
                name="description"
                validate={required}
                component={renderTextArea}
                props={{
                  rows: '5',
                  cols: '50',
                }}
              />
              <Field
                label="Movie"
                name="movie"
                component={renderAutocompleteField}
                props={
                  {
                    suggestions,
                    getSuggestions: this.getSuggestions,
                    setId: setImdbId,
                    isValid: this.isMovieValid,
                    clearFields,
                    dependentFields: ['characters'],
                  }
                }
              />
              { (availableCharacters.length !== 0 || characterState === c.CHARACTER_LOADING)
                && (
                  <Field
                    label="Characters"
                    name="characters"
                    component={renderCharacterField}
                    data={availableCharacters}
                    validate={requiredArray}
                    props={{ state: characterState }}
                  />
                )
              }
              { characterState === c.CHARACTER_NOT_FOUND
                && (
                  <div>
                    No characters found for the movie :(
                  </div>
                )
              }
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button type="submit" className="btn btn-link">
                <Link to="/remakes/">
                  Back
                </Link>
              </button>
            </form>
          </div>
          {!_.isEmpty(tmdbInfo) && (
            <div className="col-md-4">
              <TmdbInfo tmdbInfo={tmdbInfo} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.movieSuggestions,
    newRemake: state.newRemake,
    tmdbInfo: state.tmdbInfo,
  };
}

export default compose(
  connect(mapStateToProps, { ...movieActions, ...remakeActions }),
  reduxForm({ form: 'RemakeNewForm' }),
)(NewRemake);

NewRemake.propTypes = {
  clearFields: PropTypes.func.isRequired,
  createRemake: PropTypes.func.isRequired,
  fetchMovieSuggestions: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  newRemake: PropTypes.object.isRequired,
  resetMovieSuggestions: PropTypes.func.isRequired,
  setImdbId: PropTypes.func.isRequired,
  suggestions: PropTypes.object.isRequired,
  tmdbInfo: PropTypes.object.isRequired,
};
