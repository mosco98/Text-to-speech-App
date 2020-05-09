import '../Assets/css/main.css'

import React from 'react'
import { Menu } from 'react-feather'

const Header = ({ sideDrawerHandler }) => {
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center p-3 header">
      <h1>Text to Speech App</h1>
      <div className="menu-btn mt-n1" onClick={sideDrawerHandler}>
        <Menu size={35} color={'black'} />
      </div>
    </div>
  )
}

export default Header
