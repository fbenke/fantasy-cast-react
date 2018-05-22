import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemake, deleteRemake } from '../../actions'

class RemakesShow extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchRemake(id)
  }

  onDeleteClick () {
    const { id } = this.props.match.params
    this.props.deleteRemake(id, () => {
      this.props.history.push('/remakes/')
    })
  }

  render () {
    const { remake } = this.props
    if (!remake) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/remakes/">Back</Link>
        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
          Delete Remake
        </button>
        <h1>{remake.title}</h1>
      </div>
    )
  }
}

function mapStateToProps ({ remakes }, ownProps) {
  return { remake: remakes[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchRemake, deleteRemake })(RemakesShow)
