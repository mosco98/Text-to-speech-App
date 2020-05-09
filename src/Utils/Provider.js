import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Context from './Context'
import { db, userAuth } from './Database'
import Storage from './Storage'

class Provider extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      showSideDrawer: false,
      playlistId: '',
      showSaveModal: false,
      saveTitle: '',
      loginEmail: '',
      loginPassword: '',
      registerEmail: '',
      registerPassword: '',
      registerPassword2: '',
      err: false,
      errMsg: '',
      isLoading: false,
      userId: '',
      showLogoutModal: false,
      showAlert: false
    }
  }

  componentDidMount() {
    this.onAuthChange()
  }

  onAuthChange = () => {
    const id = Storage.getToken()
    if (id) {
      this.setState({
        isLoggedIn: true,
        userId: id
      })
    }
  }

  sideDrawerHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer
    }))
  }

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false })
  }
  showSaveModalHandler = () => {
    this.setState({ showSaveModal: true })
  }
  closeSaveModalHandler = () => {
    this.setState({ showSaveModal: false })
  }

  showLogoutModalHandler = () => {
    this.setState({
      showLogoutModal: true
    })
  }
  closeLogoutModalHandler = () => {
    this.setState({
      showLogoutModal: false
    })
  }

  saveAudioOnline = (audioUrl) => {
    const { saveTitle, userId } = this.state
    console.log(audioUrl, saveTitle)
    const data = {
      title: saveTitle,
      url: audioUrl
    }
    const audiosRef = db.collection('playlist').doc(userId)
    audiosRef
      .collection('audios')
      .add(data)
      .then((res) => {
        console.log(res)
      })
      .then((err) => {
        console.log('Error:', err)
      })
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  userRegistrationHandler = (e) => {
    e.preventDefault()
    this.setState({
      isLoading: true,
      showAlert: false
    })
    const { registerEmail, registerPassword, registerPassword2 } = this.state
    if (registerPassword !== registerPassword2) {
      return this.setState({
        isLoading: false,
        showAlert: true,
        err: true,
        errMsg: 'Passwords do not match'
      })
    }
    if (registerEmail === '' || registerPassword === '' || registerPassword2 === '') {
      return this.setState({
        isLoading: false,
        showAlert: true,
        err: true,
        errMsg: 'Fields cannot be empty'
      })
    }
    userAuth
      .auth()
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .then((res) => {
        const user = res.user
        if (user) {
          Storage.setToken(user.uid)
          this.onAuthChange()
          this.setState({
            userId: user.uid,
            isLoggedIn: true,
            isLoading: false,
            registerEmail: '',
            registerPassword: '',
            registerPassword2: ''
          })
          this.props.history.push('/')
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          err: true,
          errMsg: err.message,
          showAlert: true
        })
        console.log('Error:', err.message)
      })
  }

  userLoginHandler = (e) => {
    e.preventDefault()
    this.setState({
      isLoading: true,
      showAlert: false
    })
    const { loginEmail, loginPassword } = this.state
    if (loginPassword === '' || loginPassword === '') {
      return this.setState({
        err: true,
        errMsg: 'Fields cannot be blank'
      })
    }
    userAuth
      .auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then((res) => {
        const user = res.user
        if (user) {
          Storage.setToken(user.uid)
          this.onAuthChange()
          this.setState({
            userId: user.uid,
            isLoggedIn: true,
            isLoading: false,
            loginEmail: '',
            loginPassword: ''
          })
          this.props.history.push('/')
          console.log(this.props)
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({
            isLoading: false,
            isLoggedIn: false,
            err: true,
            errMsg: 'Invalid email or password',
            showAlert: true
          })
        }
      })
  }
  userLogoutHandler = () => {
    Storage.clear()
    this.setState({
      isLoggedIn: false
    })
    this.props.history.push('/')
  }

  closeAlertHandler = () => {
    this.setState({
      showAlert: false
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          sideDrawerHandler: this.sideDrawerHandler,
          closeSideDrawer: this.closeSideDrawer,
          showSaveModalHandler: this.showSaveModalHandler,
          closeSaveModalHandler: this.closeSaveModalHandler,
          inputHandler: this.inputHandler,
          saveAudioOnline: this.saveAudioOnline,
          userRegistrationHandler: this.userRegistrationHandler,
          userLoginHandler: this.userLoginHandler,
          userLogoutHandler: this.userLogoutHandler,
          showLogoutModalHandler: this.showLogoutModalHandler,
          closeLogoutModalHandler: this.closeLogoutModalHandler,
          closeAlertHandler: this.closeAlertHandler
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default withRouter(Provider)
