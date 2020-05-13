import '../../Assets/css/main.css'

import React from 'react'
import { DollarSign, Home, Layers, LogOut, Settings } from 'react-feather'
import { Link } from 'react-router-dom'

import BackDrop from './BackDrop'

const SideDrawer = ({ closeSideDrawer, showSideDrawer, isLoggedIn, showLogoutModalHandler }) => {
  return (
    <div>
      <BackDrop closeSideDrawer={closeSideDrawer} />
      <div
        className={
          showSideDrawer
            ? 'container bg-white w-25 side-drawer slideInLeft animated faster p-9'
            : 'container bg-white w-25 side-drawer slideOutLeft animated faster p-9'
        }>
        <div
          className={
            isLoggedIn
              ? 'w-100 h-75 d-flex flex-column justify-content-start'
              : 'w-100 h-75 d-flex flex-column justify-content-start'
          }>
          {isLoggedIn ? (
            <ul className="list-group">
              <Link
                to="/"
                className="list-group-item border-0 side-nav-items rounded-0 p-3 d-flex align-items-center justify-content-start my-1 text-black-50"
                onClick={closeSideDrawer}>
                <Home size={20} /> <span className="ml-2">Home</span>
              </Link>
              <Link
                to="/library"
                className="list-group-item border-0 side-nav-items rounded-0 p-3 d-flex align-items-center justify-content-start my-1 text-black-50"
                onClick={closeSideDrawer}>
                <Layers size={20} /> <span className="ml-2">Library</span>
              </Link>
              <li
                className="list-group-item border-0 side-nav-items rounded-0 p-3 d-flex align-items-center justify-content-start my-1 text-black-50"
                onClick={closeSideDrawer}>
                <DollarSign size={20} fill={'green'} color={'green'} /> <span className="ml-2">Donate</span>
              </li>
              <li
                className="list-group-item border-0 side-nav-items rounded-0 p-3 d-flex align-items-center justify-content-start my-1 text-black-50"
                onClick={closeSideDrawer}>
                <Settings size={20} /> <span className="ml-2">Settings</span>
              </li>
              <li
                className="list-group-item border-0 side-nav-items rounded-0 p-3 d-flex align-items-center justify-content-start my-1 text-black-50"
                onClick={showLogoutModalHandler}>
                <LogOut size={20} /> <span className="ml-2">Sign out</span>
              </li>
            </ul>
          ) : (
            <ul className="list-group mt-10">
              <Link
                to="/login"
                className="list-group-item my-1 border-0 side-nav-items rounded-0 p-3 text-black-50"
                onClick={closeSideDrawer}>
                Login
              </Link>
              <Link
                to="/register"
                className="list-group-item my-1 border-0 side-nav-items rounded-0 p-3 text-black-50"
                onClick={closeSideDrawer}>
                Sign up
              </Link>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideDrawer
