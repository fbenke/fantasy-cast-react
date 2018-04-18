import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemake } from '../actions'

class RemakesShow extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchRemake(id)
  }

  render () {
    const { remake } = this.props
    if (!remake) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h1>{remake.title}</h1>
      </div>
    )
  }
}

function mapStateToProps ({ remakes }, ownProps) {
  return { remake: remakes[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchRemake })(RemakesShow)
