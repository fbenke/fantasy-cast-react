import _ from 'lodash'
import React, { Component } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as remakeActions from '../../actions/remake'
import * as movieActions from '../../actions/movie'
import { required, renderField, renderTextArea } from '../../helpers/form'
import { renderAutocompleteField } from '../../helpers/autocomplete'
import * as c from '../../helpers/constants'

class RemakesNew extends Component {
  componentDidMount () {
    this.props.resetMovieSuggestions()
  }

  componentDidUpdate (prevProps) {
    const remake = this.props.newRemake
    console.log(this.props.newRemake.additionalInfo)
    if (remake.movieId !== prevProps.newRemake.movieId) {
      this.props.fetchActorSuggestions(remake.movieId)
      if (remake.movieId !== -1) {
        this.props.fetchAdditionalMovieInfo(remake.movieId)
      }
    }
  }

  constructor (props) {
    super(props)
    this.getSuggestions = _.debounce((value) => {
      this.props.fetchMovieSuggestions(value)
    }, 200)
    this.isMovieIdValid = this.isMovieIdValid.bind(this)
    this.renderActors = this.renderActors.bind(this)
    this.renderAdditionalInfo = this.renderAdditionalInfo.bind(this)
  }

  onSubmit (values) {
    this.props.createRemake({
      ...values,
      movie: this.props.newRemake.movieId,
      tmdbId: this.props.newRemake.additionalInfo.tmdbId },
    () => {
      this.props.history.push('/remakes/')
    })
  }

  isMovieIdValid () {
    return this.props.newRemake.movieId !== -1
  }

  renderActors () {
    return _.map(this.props.newRemake.actors, actor => {
      return (
        <li key={actor.id} >
          {actor.characters} ({actor.person.primaryName})
          <a className="btn btn-danger"
            onClick={() => this.props.deleteActor(actor)}>X</a>
        </li>
      )
    })
  }

  renderAdditionalInfo () {
    const TMDB_POSTER_PATH = `${c.TMDB_IMAGE_BASE_URL}/${c.TMDB_POSTER_SIZE}`

    return (
      <div>
        <div>
          { this.props.newRemake.additionalInfo.posterPath !== undefined &&
            <img src={`${TMDB_POSTER_PATH}${this.props.newRemake.additionalInfo.posterPath}`} />
          }
        </div>
        <div>
          { this.props.newRemake.additionalInfo.overview !== undefined &&
            this.props.newRemake.additionalInfo.overview
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
                setId: this.props.setMovieId,
                isValid: this.isMovieIdValid
              }
            }
          />
          <div>
            <ul>
              { this.renderActors() }
            </ul>
          </div>
          <div> { this.renderAdditionalInfo() } </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/remakes/">Back</Link>
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
