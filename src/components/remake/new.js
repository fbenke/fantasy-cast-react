import _ from 'lodash'
import React, { Component } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as remakeActions from '../../actions/remake'
import * as movieActions from '../../actions/movie'
import { required, renderField, renderTextArea, requiredArray } from '../../helpers/form'
import * as c from '../../helpers/constants'
import { renderAutocompleteField } from './autocomplete'
import { renderCharacterField } from './characters_selector'
import TmdbInfo from './tmdb_info'

class RemakesNew extends Component {
  componentDidMount () {
    this.props.resetMovieSuggestions()
  }

  constructor (props) {
    super(props)
    this.getSuggestions = _.debounce((value) => {
      this.props.fetchMovieSuggestions(value)
    }, 200)
    this.isMovieValid = this.isMovieValid.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (values) {
    if (this.isMovieValid()) {
      this.props.createRemake({
        ...values,
        movie: this.props.newRemake.imdbId,
        tmdbId: this.props.tmdbId
      },
      () => {
        this.props.history.push('/remakes/')
      })
    }
  }

  isMovieValid () {
    return this.props.newRemake.imdbId !== -1
  }

  render () {
    const { handleSubmit, clearFields,
      newRemake: {availableCharacters, characterState} } = this.props
    return (
      <div>
        <h1> Which movie would you like to recast? </h1>
        <div className="row remakes-new">
          <div className="col-md-7 col-md-offset-1">
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
                props={
                  {rows: '5',
                    cols: '50'}
                }
              />
              <Field
                label="Movie"
                name="movie"
                component={renderAutocompleteField}
                props={
                  {suggestions: this.props.suggestions,
                    getSuggestions: this.getSuggestions,
                    setId: this.props.setImdbId,
                    isValid: this.isMovieValid,
                    clearFields: clearFields,
                    dependentFields: ['characters']
                  }
                }
              />
              { (availableCharacters.length !== 0 || characterState === c.CHARACTER_LOADING) &&
                <Field
                  label="Characters"
                  name="characters"
                  component={renderCharacterField}
                  data={availableCharacters}
                  validate={requiredArray}
                  props={
                    {state: characterState}
                  }
                />
              }
              { characterState === c.CHARACTER_NOT_FOUND &&
                <div>No characters found for the movie :(</div>
              }
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="submit" className="btn btn-link"><Link to="/remakes/">Back</Link></button>
            </form>
          </div>
          <div className="col-md-4">
            <TmdbInfo/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    suggestions: state.movieSuggestions,
    newRemake: state.newRemake,
    tmdbId: state.tmdbInfo.tmdbId
  }
}

export default compose(
  connect(mapStateToProps, { ...movieActions, ...remakeActions }),
  reduxForm({ form: 'RemakeNewForm' })
)(RemakesNew)
