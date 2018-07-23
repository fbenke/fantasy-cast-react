import React from 'react'
import Popup from 'reactjs-popup'
import { connect } from 'react-redux'
import { deleteRemake } from '../../actions/remake'
import PropTypes from 'prop-types'

class DeleteRemakeModal extends React.Component {
  render () {
    return (
      <Popup trigger={<button className="btn btn-danger"> Delete voting </button>} modal>
        {close => (
          <div className="modal">
            <div className="header"> Delete this remake </div>
            <div className="content">Are you sure?</div>
            <div className="actions">
              <button
                className="btn btn-danger"
                onClick={() => {
                  const id = this.props.remake
                  this.props.deleteRemake(id, () => {
                    this.props.history.push('/remakes/')
                  })
                  close()
                }}
              >
                Close
              </button>
              <button
                className="btn btn-default"
                onClick={close}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}

export default connect(null, { deleteRemake })(DeleteRemakeModal)

DeleteRemakeModal.propTypes = {
  deleteRemake: PropTypes.func,
  history: PropTypes.object,
  remake: PropTypes.object
}