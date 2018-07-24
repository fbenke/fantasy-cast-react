import React from 'react';
import PropTypes from 'prop-types';
import { TMDB_POSTER_PATH } from '../../helpers/constants';

function TmdbInfo(props) {
  const { tmdbInfo: { overview, posterPath } } = props;
  return (
    <div className="tmdb">
      {posterPath !== ''
        && (
          <div>
            <img
              src={`${TMDB_POSTER_PATH}${posterPath}`}
              className="rounded mx-auto d-block"
              alt="Tmdb"
            />
          </div>
        )
      }
      <div>
        { overview }
      </div>
    </div>
  );
}

export default TmdbInfo;

TmdbInfo.propTypes = {
  tmdbInfo: PropTypes.shape({
    overview: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
  }).isRequired,
};
