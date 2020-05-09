import '../Assets/css/main.css'

import React from 'react'

import Context from '../Utils/Context'

const LogoutModal = ({ closeLogoutModalHandler, closeSideDrawer }) => {
  return (
    <Context.Consumer>
      {(context) => {
        const { userLogoutHandler } = context
        return (
          <div className="custom-modal h-100 w-100 position-fixed d-flex align-items-center justify-content-center">
            <div className="container h-25 d-flex flex-column align-items-center justify-content-center w-50 custom-modal-form">
              <h3 className="w-100 text-center text-white">Are you sure you want to logout?</h3>
              <div className="container w-25 d-flex align-items-center justify-content-between mt-4 custom-modal-btn-ctn">
                <button
                  className="btn btn-sm btn-success py-3 px-4"
                  onClick={() => {
                    userLogoutHandler()
                    closeLogoutModalHandler()
                    closeSideDrawer()
                  }}>
                  Yes
                </button>
                <button className="btn btn-sm btn-danger py-3 px-4" onClick={closeLogoutModalHandler}>
                  No
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default LogoutModal
