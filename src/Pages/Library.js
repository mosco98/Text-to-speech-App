import '../Assets/css/main.css'

import React, { Component } from 'react'
import { Headphones, MoreVertical } from 'react-feather'

import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Loader from '../Components/Loader'
import LogoutModal from '../Components/LogoutModal'
import NowPlayingModal from '../Components/NowPlayingModal'
import SideDrawer from '../Components/SideDrawer/SideDrawer'
import Context from '../Utils/Context'
import { db } from '../Utils/Database'
import Storage from '../Utils/Storage'

export default class Library extends Component {
  constructor() {
    super()
    this.state = {
      audios: [],
      isLoading: true,
      showModal: false,
      nowPlayingUrl: '',
      nowPlayingTitle: ''
    }
  }

  componentDidMount() {
    this.getAudios()
  }

  getAudios = () => {
    const id = Storage.getToken()
    db.collection('playlist')
      .doc(id)
      .collection('audios')
      .onSnapshot((snapshot) => {
        const audios = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        return this.setState({ audios, isLoading: false })
      })
  }

  playAudio = (e) => {
    const audioId = e.target.id
    const { audios } = this.state
    const filteredArray = audios.filter((audio) => {
      return audio.id === audioId
    })
    // eslint-disable-next-line array-callback-return
    filteredArray.map((audio) => {
      const nowPlayingUrl = audio.url
      const nowPlayingTitle = audio.title
      if (nowPlayingUrl && nowPlayingTitle) {
        return this.setState({ nowPlayingUrl, nowPlayingTitle, showModal: true })
      }
    })
  }

  closeModal = () => {
    this.setState({ showModal: false, nowPlayingUrl: '', nowPlayingTitle: '' })
  }

  render() {
    const { audios, isLoading, showModal, nowPlayingUrl, nowPlayingTitle } = this.state
    return (
      <Context.Consumer>
        {(context) => {
          return (
            <div className="vh-100 d-flex flex-column align-items-center">
              <Header sideDrawerHandler={context.sideDrawerHandler} />
              {context.state.showSideDrawer && (
                <SideDrawer
                  isLoggedIn={context.state.isLoggedIn}
                  closeSideDrawer={context.closeSideDrawer}
                  showSideDrawer={context.state.showSideDrawer}
                  showLogoutModalHandler={context.showLogoutModalHandler}
                />
              )}

              {isLoading ? (
                <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
                  <Loader />
                </div>
              ) : (
                <div className="w-50 p-2 container library-items overflow-scroll mb-10">
                  {/* <h3 className="text-center">Saved Conversions</h3> */}
                  {audios.length ? (
                    <div className="h-auto w-100 p-6">
                      <ul className="list-group w-100">
                        {audios.map((audio) => (
                          <li
                            className="list-group-item my-3 border rounded d-flex align-items-center justify-content-between p-4 row"
                            key={audio.id}
                            style={{ cursor: 'pointer' }}>
                            <div className="d-flex align-items-center justify-content-between  col-10 p-0">
                              <span className="text-truncate" title={audio.title}>
                                {audio.title}
                              </span>
                              <Headphones id={audio.id} size={18} onClick={this.playAudio} />
                            </div>
                            <MoreVertical className="col-2" size={20} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="h-auto w-100 p-6 d-flex justify-content-center align-items-center">
                      <p>You have no saved audio</p>
                    </div>
                  )}
                </div>
              )}
              {showModal && (
                <NowPlayingModal
                  nowPlayingUrl={nowPlayingUrl}
                  nowPlayingTitle={nowPlayingTitle}
                  closeModal={this.closeModal}
                />
              )}
              {context.state.showLogoutModal && (
                <LogoutModal
                  closeLogoutModalHandler={context.closeLogoutModalHandler}
                  closeSideDrawer={context.closeSideDrawer}
                  userLogoutHandler={context.userLogoutHandler}
                />
              )}
              <Footer />
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
