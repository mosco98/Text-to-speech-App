import '../Assets/css/main.css'

import React from 'react'

const SaveModal = ({ closeSaveModalHandler, saveAudioOnline, inputHandler, audioUrl }) => {
  return (
    <div className="custom-modal h-100 w-100 position-fixed d-flex align-items-center justify-content-center">
      <div className="container h-25 d-flex flex-column align-items-center justify-content-center w-50 custom-modal-form">
        <input className="form-control w-50" placeholder="Enter title" name="saveTitle" onChange={inputHandler} />
        <div className="container w-25 d-flex align-items-center justify-content-between mt-4 custom-modal-btn-ctn">
          <button className="btn btn-sm btn-danger p-3 mr-4" onClick={closeSaveModalHandler}>
            Cancel
          </button>
          <button
            className="btn btn-sm btn-success p-3"
            onClick={() => {
              saveAudioOnline(audioUrl)
            }}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SaveModal
