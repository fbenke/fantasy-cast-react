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
import { renderAutocompleteField } from '../../helpers/autocomplete'
import { renderCharacterField } from './characters'

class RemakesNew extends Component {
  componentDidMount () {
    this.props.resetMovieSuggestions()
  }

  constructor (props) {
    super(props)
    this.getSuggestions = _.debounce((value) => {
      this.props.fetchMovieSuggestions(value)
    }, 200)
    this.renderTmdbInfo = this.renderTmdbInfo.bind(this)
    this.isMovieValid = this.isMovieValid.bind(this)
  }

  onSubmit (values) {
    this.props.createRemake({
      ...values,
      movie: this.props.newRemake.imdbId,
      tmdbId: this.props.newRemake.tmdbId
    },
    () => {
      this.props.history.push('/remakes/')
    })
  }
  isMovieValid () {
    return this.props.newRemake.imdbId !== -1
  }
  renderTmdbInfo () {
    const TMDB_POSTER_PATH = `${c.TMDB_IMAGE_BASE_URL}${c.TMDB_POSTER_SIZE}`

    const tmdbInfo = this.props.newRemake.tmdbInfo
    return (
      <div>
        <div>
          { (tmdbInfo.posterPath !== undefined && tmdbInfo.posterPath !== '') &&
            <img src={`${TMDB_POSTER_PATH}${tmdbInfo.posterPath}`} />
          }
        </div>
        <div>
          { tmdbInfo.overview !== undefined &&
            tmdbInfo.overview
          }
        </div>
      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className="remakes-new">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
                isValid: this.isMovieValid
              }
            }
          />
          { this.props.newRemake.availableCharacters.length !== 0 &&
            <Field
              label="Characters"
              name="characters"
              component={renderCharacterField}
              data={this.props.newRemake.availableCharacters}
              validate={requiredArray}
            />
          }
          <div> { this.renderTmdbInfo() } </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="submit" className="btn btn-link"><Link to="/remakes/">Back</Link></button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { suggestions: state.movies, 'newRemake': state.newRemake }
}

export default compose(
  connect(mapStateToProps, { ...movieActions, ...remakeActions }),
  reduxForm({ form: 'RemakeNewForm' })
)(RemakesNew)
