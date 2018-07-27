import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';

function CloseRemakeModal(props) {
  return (
    <Popup
      modal
      trigger={(
        <button className="btn btn-primary" type="button">
          Close voting
        </button>
      )}
    >
      {close => (
        <div className="modal">
          <div className="header">
            Close Voting
          </div>
          <div className="content">
            Are you sure?
          </div>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                const { remake, closeRemake } = props;
                closeRemake(remake);
                close();
              }}
              type="submit"
            >
              Close
            </button>
            <button
              className="btn btn-default"
              onClick={close}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default (CloseRemakeModal);

CloseRemakeModal.propTypes = {
  closeRemake: PropTypes.func.isRequired,
  remake: PropTypes.string.isRequired,
};
