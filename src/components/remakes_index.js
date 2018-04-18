import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RemakesIndex extends Component {
  renderList () {
    return this.props.remakes.map(remake => {
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
      <div>
        <h1> Remakes </h1>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
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
