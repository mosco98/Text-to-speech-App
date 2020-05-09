import '../Assets/css/main.css'

import React from 'react'

const Loader = ({ converting, auth }) => {
  if (converting) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-3">
        <div className="loader loader-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h6 className="mt-2 text-black-50">Converting...</h6>
      </div>
    )
  }
  if (auth) {
    return (
      <div className="loader loader-4 loader-auth">
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }
  return (
    <div className="loader loader-4">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Loader
