import '../Assets/css/main.css'

import React from 'react'
import { X } from 'react-feather'

const ProcessModal = ({ audioUrl, closeModal }) => {
  return (
    <div className="custom-modal vh-100 w-100 d-flex align-items-center justify-content-center">
      <div className="x p-3">
        <X size={24} color={'#fff'} onClick={closeModal} />
      </div>

      <audio controls={true} controlsList="nodownload" className="audio-player">
        <source src={audioUrl} />
      </audio>
    </div>
  )
}

export default ProcessModal
