import '../Assets/css/main.css'

import React from 'react'
import { X } from 'react-feather'

const NowPlayingModal = ({ nowPlayingUrl, nowPlayingTitle, closeModal }) => {
  return (
    <div className="vh-100 w-100 custom-modal d-flex align-items-center justify-content-center">
      <X className="x mt-2 mr-2" size={24} onClick={closeModal} />
      <div className="container d-flex flex-column align-items-center justify-content-center p-2">
        <h4 className="text-white mb-4 text-capitalize w-100 text-center">{nowPlayingTitle}</h4>
        <audio controls={true} controlsList="nodownload" className="audio-player">
          <source src={nowPlayingUrl} />
        </audio>
      </div>
    </div>
  )
}

export default NowPlayingModal
