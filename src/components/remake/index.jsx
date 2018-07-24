import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchRemakes } from '../../actions/remake';

const renderList = remakes => (
  _.map(remakes, remake => (
    <li
      key={remake.id}
      className="list-group-item list-group-item-action"
    >
      <Link to={`/remakes/${remake.id}`}>
        {`${remake.title} (Recast of "${remake.movie.originalTitle}" by ${remake.user.username})`}
      </Link>
    </li>
  ))
);

class RemakesIndex extends Component {
  componentDidMount() {
    const { fetchRemakes } = this.props;
    fetchRemakes();
  }

  render() {
    const { remakes } = this.props;
    return (
      <div className="remakes-index">
        <div>
          <h1>
            Vote for recasts
          </h1>
          <ul className="list-group col-xs-10">
            {renderList(_.filter(remakes, r => (r.isOpen)))}
          </ul>
        </div>
        <div>
          <h1>
            Closed recasts
          </h1>
          <ul className="list-group col-xs-10 ">
            {renderList(_.filter(remakes, r => (!r.isOpen)))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { remakes: state.remakes };
}

export default connect(mapStateToProps, { fetchRemakes })(RemakesIndex);

RemakesIndex.propTypes = {
  fetchRemakes: PropTypes.func.isRequired,
  remakes: PropTypes.object.isRequired,
};
