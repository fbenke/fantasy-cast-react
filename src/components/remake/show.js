import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemake, deleteRemake } from '../../actions/remake'
import { getUserDetails } from '../../actions/auth'
import TmdbInfo from './tmdb_info'

class RemakesShow extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchRemake(id)
    this.props.getUserDetails()
  }

  onDeleteClick () {
    const { id } = this.props.match.params
    this.props.deleteRemake(id, () => {
      this.props.history.push('/remakes/')
    })
  }

  renderCharacters () {
    const characters = _.orderBy(this.props.remake.characters, ['order'], ['asc'])
    return _.map(characters, character => {
      return (
        <li key={character.id}>{character.character}</li>
      )
    })
  }

  hasEditRights () {
    const { remake, user } = this.props
    if (user && remake) {
      return (user.username === remake.user.username)
    } else {
      return false
    }
  }

  render () {
    const { remake } = this.props
    if (!remake) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h1>"{remake.title}" <small>by {remake.user.username}</small></h1>
        <div className="row">
          <div className="col-md-7 col-md-offset-1">
            <table className="table table-hover table-striped">
              <tbody>
                <tr>
                  <td>{remake.movie.titleType} Title</td>
                  <td>{remake.movie.primaryTitle} ({remake.movie.startYear})</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{remake.description}</td>
                </tr>
                <tr>
                  <td>Characters</td>
                  <td>
                    <ul className="list-unstyled">
                      {this.renderCharacters()}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <TmdbInfo/>
          </div>
        </div>
        <div>
          { this.hasEditRights() &&
            (<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
              Delete
            </button>)
          }
          { this.hasEditRights() &&
            (<button className="btn btn-primary">
              Close Voting
            </button>)
          }
          <button type="submit" className="btn btn-link">
            <Link to="/remakes/">Back</Link>
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ remakes, tmdbInfo, auth: {user} }, ownProps) {
  return { remake: remakes[ownProps.match.params.id], tmdbInfo, user }
}

export default connect(mapStateToProps, { fetchRemake, deleteRemake, getUserDetails })(RemakesShow)
