import React from 'react'
import Popup from 'reactjs-popup'
import { connect } from 'react-redux'
import { closeRemake, fetchRemake } from '../../actions/remake'

class CloseRemakeModal extends React.Component {
  render () {
    return (
      <Popup trigger={<button className="btn btn-primary"> Close voting </button>} modal>
        {close => (
          <div className="modal">
            <div className="header"> Close Voting </div>
            <div className="content">Are you sure?</div>
            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  const id = this.props.remake
                  this.props.closeRemake(id, () => {
                    this.props.fetchRemake(id)
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

export default connect(null, { closeRemake, fetchRemake })(CloseRemakeModal)
