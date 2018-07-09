import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemake } from '../../actions/remake'
import { getUserDetails } from '../../actions/auth'
import TmdbInfo from './tmdb_info'
import CloseRemakeModal from './confirm_close_modal'
import DeleteRemakeModal from './confirm_delete_modal'

class RemakesShow extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchRemake(id)
    this.props.getUserDetails()
  }

  componentDidUpdate () {
    if (this.props.error !== undefined) {
      this.props.history.push('/')
    }
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
            <DeleteRemakeModal remake={this.props.match.params.id} history={this.props.history}/>
          }
          { this.hasEditRights() && remake.isOpen &&
            <CloseRemakeModal remake={this.props.match.params.id}/>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ remakes, tmdbInfo, auth: {user} }, ownProps) {
  return { remake: remakes[ownProps.match.params.id], tmdbInfo, user, error: remakes.error }
}

export default connect(mapStateToProps, { fetchRemake, getUserDetails })(RemakesShow)
