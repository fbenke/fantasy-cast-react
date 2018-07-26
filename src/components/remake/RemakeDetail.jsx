import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAdditionalMovieInfo } from '../../actions/tmdb';
import * as remakeActions from '../../actions/remake';
import { getUserDetails } from '../../actions/auth';
import TmdbInfo from './TmdbInfo';
import CloseRemakeModal from './CloseRemakeModal';
import DeleteRemakeModal from './DeleteRemakeModal';


class RemakeDetail extends Component {
  componentDidMount() {
    const {
      match: { params: { id } }, resetRemake, fetchRemake,
      getUserDetails, fetchAdditionalMovieInfo,
    } = this.props;
    resetRemake();
    fetchRemake(id);
    fetchAdditionalMovieInfo(id);
    getUserDetails();
  }

  componentDidUpdate() {
    const { remake, history } = this.props;
    if (remake.error !== undefined) {
      history.push('/');
    }
  }

  hasEditRights() {
    const { remake, user } = this.props;
    if (user && remake.user) {
      return (user.username === remake.user.username);
    }
    return false;
  }

  renderCharacters() {
    const { remake } = this.props;
    const characters = _.orderBy(remake.characters, ['order'], ['asc']);
    return _.map(characters, character => (
      <li key={character.id}>
        {character.character}
      </li>
    ));
  }

  render() {
    const {
      match: { params: { id } }, history, remake, tmdbInfo,
      deleteRemake, closeRemake, fetchRemake,
    } = this.props;

    if (_.isEmpty(remake) || remake.error !== undefined) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    return (
      <div>
        <h1>
          {`"${remake.title}"`}
          <small>
            {` by ${remake.user.username}`}
          </small>
        </h1>
        <div className="row">
          <div className="col-md-7 offset-md-1">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <td>
                    {`${remake.movie.titleType} Title`}
                  </td>
                  <td>
                    {`${remake.movie.primaryTitle} (${remake.movie.startYear})`}
                  </td>
                </tr>
                <tr>
                  <td>
                    Description
                  </td>
                  <td>
                    {remake.description}
                  </td>
                </tr>
                <tr>
                  <td>
                    Characters
                  </td>
                  <td>
                    <ul className="list-unstyled">
                      {this.renderCharacters()}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!_.isEmpty(tmdbInfo) && (
            <div className="col-md-4">
              <TmdbInfo tmdbInfo={tmdbInfo} />
            </div>
          )}
        </div>
        <div className="options">
          { this.hasEditRights()
            && <DeleteRemakeModal remake={id} history={history} deleteRemake={deleteRemake} />
          }
          { this.hasEditRights() && remake.isOpen
            && <CloseRemakeModal remake={id} closeRemake={closeRemake} fetchRemake={fetchRemake} />
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ remake, tmdbInfo, auth: { user } }) {
  return { remake, tmdbInfo, user };
}

export default connect(mapStateToProps, {
  ...remakeActions, getUserDetails, fetchAdditionalMovieInfo,
})(RemakeDetail);

RemakeDetail.propTypes = {
  closeRemake: PropTypes.func.isRequired,
  deleteRemake: PropTypes.func.isRequired,
  fetchRemake: PropTypes.func.isRequired,
  fetchAdditionalMovieInfo: PropTypes.func.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  remake: PropTypes.object.isRequired,
  resetRemake: PropTypes.func.isRequired,
  tmdbInfo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
