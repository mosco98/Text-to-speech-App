import '../Assets/css/main.css'

import React from 'react'

import Context from '../Utils/Context'

const Alert = () => {
  return (
    <Context.Consumer>
      {(context) => {
        const { closeAlertHandler } = context
        return (
          <div className="alert alert-danger">
            <span className="float-right close-alert-btn" onClick={closeAlertHandler}>
              x
            </span>
            <p>{context.state.errMsg}</p>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default Alert
