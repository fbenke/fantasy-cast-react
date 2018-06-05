import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { createRemake } from '../../actions/remake'
import { fetchMovieSuggestions } from '../../actions/movie'
import { required, renderField, renderAutocompleteField } from '../../helpers/form'

class RemakesNew extends Component {
  constructor (props) {
    super(props)
    this.state = { movieId: -1 }
    this.getSuggestions = debounce((value) => {
      this.props.fetchMovieSuggestions(value)
    }, 200)
    this.setMovieId = this.setMovieId.bind(this)
    this.isMovieIdValid = this.isMovieIdValid.bind(this)
  }

  onSubmit (values) {
    this.props.createRemake({ ...values, movieId: this.state.movieId }, () => {
      this.props.history.push('/remakes/')
    })
  }

  setMovieId (id) {
    this.setState({ movieId: id })
  }

  isMovieIdValid () {
    return this.state.movieId !== -1
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
            label="Movie"
            name="movie"
            validate={required}
            component={renderAutocompleteField}
            props={
              {suggestions: this.props.suggestions,
                getSuggestions: this.getSuggestions,
                setMovieId: this.setMovieId,
                isMovieIdValid: this.isMovieIdValid
              }
            }
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/remakes/">Back</Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { suggestions: state.movies }
}

export default reduxForm({
  form: 'RemakeNewForm'
})(
  connect(mapStateToProps, { createRemake, fetchMovieSuggestions })(RemakesNew)
)
