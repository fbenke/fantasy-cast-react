import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as c from '../../helpers/constants'
import PropTypes from 'prop-types';

class TmdbInfo extends Component {
  render () {
    const TMDB_POSTER_PATH = `${c.TMDB_IMAGE_BASE_URL}${c.TMDB_POSTER_SIZE}`
    const tmdbInfo = this.props.tmdbInfo
    return (
      <div className="tmdb">
        <div>
          { (tmdbInfo.posterPath !== undefined && tmdbInfo.posterPath !== '') &&
            <img src={`${TMDB_POSTER_PATH}${tmdbInfo.posterPath}`} className="rounded mx-auto d-block"/>
          }
        </div>
        <div>
          { tmdbInfo.overview !== undefined &&
            tmdbInfo.overview
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ tmdbInfo }) {
  return { tmdbInfo }
}

export default connect(mapStateToProps)(TmdbInfo)


TmdbInfo.propTypes = {
  tmdbInfo: PropTypes.object
};