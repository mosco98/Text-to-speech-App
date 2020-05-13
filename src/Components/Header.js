import '../Assets/css/main.css'

import React from 'react'
import { Menu } from 'react-feather'

const Header = ({ sideDrawerHandler }) => {
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center header">
      <div className="menu-btn mt-n1" onClick={sideDrawerHandler}>
        <Menu size={35} color={'black'} />
      </div>
      <h1>App logo</h1>
    </div>
  )
}

export default Header
