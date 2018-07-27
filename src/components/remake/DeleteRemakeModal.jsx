import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';

function DeleteRemakeModal(props) {
  return (
    <Popup
      modal
      trigger={(
        <button className="btn btn-danger" type="button">
          Delete voting
        </button>
      )}
    >
      {close => (
        <div className="modal">
          <div className="header">
            Delete this remake
          </div>
          <div className="content">
            Are you sure?
          </div>
          <div className="actions">
            <button
              className="btn btn-danger"
              onClick={() => {
                const { remake, deleteRemake } = props;
                deleteRemake(remake);
                close();
              }}
              type="submit"
            >
              Delete
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

export default DeleteRemakeModal;

DeleteRemakeModal.propTypes = {
  deleteRemake: PropTypes.func.isRequired,
  remake: PropTypes.string.isRequired,
};
