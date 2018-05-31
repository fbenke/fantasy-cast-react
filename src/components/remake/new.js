import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Autocomplete from 'react-autocomplete'
import { createRemake, fetchMovieSuggestions } from '../../actions'
import { required, renderField } from '../../helpers/form'

class RemakesNew extends Component {
  constructor (props) {
    super(props)
    this.state = { movie: -1, dropDownInput: '' }
    this.onDropdownSelect = this.onDropdownSelect.bind(this)
    this.onDropdownChange = this.onDropdownChange.bind(this)
  }

  onDropdownSelect (value, item) {
    this.setState({ movie: item.id, dropDownInput: value })
  }

  onDropdownChange (event, value) {
    this.setState({ dropDownInput: value })
    if (value.length > 0) {
      this.props.fetchMovieSuggestions(value)
    }
  }

  onSubmit (values) {
    this.props.createRemake(values, () => {
      this.props.history.push('/remakes/')
    })
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
    const dropDownClass = `form-group ${this.props.movies.notFound ? 'has-danger' : ''}`
    return (
      <div className="remakes-new">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <fieldset className="form-group">
            <Field
              label="Title"
              name="title"
              type="text"
              validate={required}
              component={renderField}
            />
          </fieldset>
          <fieldset className={dropDownClass}>
            <label>Movie</label>
            <Autocomplete
              inputProps={{ className: 'form-control' }}
              wrapperStyle={{ display: 'block' }}
              value={this.state.dropDownInput}
              items={this.props.movies.suggestions}
              getItemValue={(item) => item.name}
              onSelect={this.onDropdownSelect}
              onChange={this.onDropdownChange}
              renderItem={this.renderDropdownItem}
            />
            <div className="text-help">
              {this.props.movies.notFound ? 'No matching movie title found' : ''}
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
