import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemakes } from '../../actions/remake'

class RemakesIndex extends Component {
  componentDidMount () {
    this.props.fetchRemakes()
  }

  renderList (remakes) {
    return _.map(remakes, remake => {
      return (
        <li
          key={remake.id}
          className="list-group-item list-group-item-action"
        >
          <Link to={`/remakes/${remake.id}`}>
            {remake.title} (Recast of "{remake.movie.originalTitle}" by {remake.user.username})
          </Link>
        </li>
      )
    })
  }

  render () {
    return (
      <div className="remakes-index">
        <div>
          <h1> Vote for recasts </h1>
          <ul className="list-group col-sm-10 col-sm-offset-1">
            {this.renderList(_.filter(_.omit(this.props.remakes, 'error'), r => (r.isOpen)))}
          </ul>
        </div>
        <div>
          <h1> Closed recasts </h1>
          <ul className="list-group col-sm-10 col-sm-offset-1">
            {this.renderList(_.filter(_.omit(this.props.remakes, 'error'), r => (!r.isOpen)))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { remakes: state.remakes }
}

export default connect(mapStateToProps, { fetchRemakes })(RemakesIndex)
