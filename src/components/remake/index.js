import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemakes } from '../../actions/remake'

class RemakesIndex extends Component {
  componentDidMount () {
    this.props.fetchRemakes()
  }

  renderList () {
    return _.map(this.props.remakes, remake => {
      return (
        <li
          key={remake.id}
          className="list-group-item"
        >
          <Link to={`/remakes/${remake.id}`}>
            {remake.title}
          </Link>
        </li>
      )
    })
  }

  render () {
    return (
      <div className="remakes-index">
        <h1> Remakes </h1>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
        <Link to={'/remakes/add/'}>New Remake</Link>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { remakes: state.remakes }
}

export default connect(mapStateToProps, { fetchRemakes })(RemakesIndex)
