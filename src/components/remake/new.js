import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Autocomplete from 'react-autocomplete'
import { createRemake } from '../../actions/remake'
import { fetchMovieSuggestions } from '../../actions/movie'
import { required, renderField } from '../../helpers/form'

class RemakesNew extends Component {
  componentDidUpdate () {
    console.log(this.state)
  }

  constructor (props) {
    super(props)
    this.state = { movie: -1, dropDownInput: '', touched: false }
    this.onDropdownSelect = this.onDropdownSelect.bind(this)
    this.onDropdownChange = this.onDropdownChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.getSuggestions = debounce((value) => {
      this.props.fetchMovieSuggestions(value)
    }, 200)
  }

  onDropdownSelect (value, item) {
    this.setState({ movie: item.id, dropDownInput: value })
  }

  onDropdownChange (event, value) {
    this.setState({ dropDownInput: value })
    if (value.length > 0) {
      this.getSuggestions(value)
    }
  }

  onSubmit (values) {
    this.props.createRemake(values, () => {
      this.props.history.push('/remakes/')
    })
  }

  handleBlur () {
    this.setState({ ...this.state, touched: true })
  }

  renderDropdownItem (item, isHighlighted) {
    return (
      <div
        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
        key={item.id}
      >
        { `${item.name} (${item.type} from ${item.year})` }
      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props

    const shouldMarkError = () => {
      const serverError = this.props.movies.notFound
      const frontendError = this.state.touched && this.state.movie === -1
      return serverError || frontendError
    }

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
          <fieldset className={`form-group ${shouldMarkError() ? 'has-danger' : ''}`}>
            <label>Movie</label>
            <Autocomplete
              inputProps={{ className: 'form-control', onBlur: this.handleBlur }}
              wrapperStyle={{ display: 'block' }}
              value={this.state.dropDownInput}
              items={this.props.movies.suggestions}
              getItemValue={(item) => `${item.name} (${item.type} from ${item.year})`}
              onSelect={this.onDropdownSelect}
              onChange={this.onDropdownChange}
              renderItem={this.renderDropdownItem}

            />
            <div className="text-help">
              {this.props.movies.notFound ? 'No matching movie title found' : ''}
              {this.state.touched && this.state.movie === -1 ? 'Required' : ''}
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/remakes/">Back</Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { movies: state.movies }
}

export default reduxForm({
  form: 'RemakeNewForm'
})(
  connect(mapStateToProps, { createRemake, fetchMovieSuggestions })(RemakesNew)
)
