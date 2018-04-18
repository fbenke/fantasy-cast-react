import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RemakesIndex extends Component {
  renderList () {
    return _.map(this.props.remakes, remake => {
      return (
        <li
          key={remake.title}
          className="list-group-item"
        >
          {remake.title}
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        <h1> Remakes </h1>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
        <Link to={'/remakes/add/'}>New Remake </Link>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    remakes: state.remakes
  }
}

export default connect(mapStateToProps)(RemakesIndex)
