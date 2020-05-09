import '../../Assets/css/main.css'

import React from 'react'

const BackDrop = ({ closeSideDrawer }) => {
  return <div className="back-drop vh-100 w-100" onClick={closeSideDrawer} />
}

export default BackDrop
