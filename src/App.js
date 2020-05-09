import './Assets/css/main.css'

import axios from 'axios'
import React, { Component } from 'react'
import { Download, Headphones, RefreshCcw } from 'react-feather'
import Select from 'react-select'

import Footer from './Components/Footer'
import Header from './Components/Header'
import Loader from './Components/Loader'
import LogoutModal from './Components/LogoutModal'
import ProcessModal from './Components/ProcessModal'
import SaveModal from './Components/SaveModal'
import SideDrawer from './Components/SideDrawer/SideDrawer'
import Context from './Utils/Context'

const server = 'https://afternoon-anchorage-75243.herokuapp.com'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      selectedVoice: null,
      error: false,
      errMsg: '',
      converted: false,
      options: [],
      isLoading: true,
      audioUrl: '',
      showProcessModal: false,
      converting: false
    }
  }

  componentDidMount() {
    this.getVoices()
  }

  getVoices = () => {
    axios(`${server}/voices`)
      .then(({ data }) => {
        const voices = data.voices.result.voices

        const options = []
        for (let i = 0; i < voices.length; i++) {
          options.push({ value: voices[i].name, label: voices[i].description })
        }

        this.setState({ options, isLoading: false })
      })
      .catch((err) => {
        console.log('Error:', err)
      })
  }

  convertText = () => {
    const { text, selectedVoice } = this.state
    this.setState({ converting: true })
    axios
      .post(`${server}/convert`, { text, selectedVoice })
      .then((res) => {
        console.log(res)
        this.setState({ converted: true, converting: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  streamHandler = () => {
    axios
      .get(`${server}/stream`, {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'audio/mp3'
        }
      })
      .then((res) => {
        console.log(res)
        const blob = new Blob([res.data], { type: 'audio/mp3' })
        const audioUrl = URL.createObjectURL(blob)
        if (audioUrl) {
          this.setState({ audioUrl, loading: false, showProcessModal: true })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSelect = (selectedVoice) => {
    this.setState({ selectedVoice: selectedVoice.value })
  }

  textInputHandler = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  closeModal = () => {
    this.setState({ showProcessModal: false })
  }

  newConvertHandler = () => {
    this.setState({ converted: false, text: '' })
  }

  loginRedirect = () => {
    this.props.history.push('/login')
  }

  render() {
    const { converted, options, isLoading, showProcessModal, audioUrl, converting } = this.state

    if (isLoading) {
      return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      )
    }
    return (
      <Context.Consumer>
        {(context) => (
          <div className="vh-100 d-flex flex-column align-items-center">
            <Header sideDrawerHandler={context.sideDrawerHandler} />
            {context.state.showSideDrawer && (
              <SideDrawer
                closeSideDrawer={context.closeSideDrawer}
                showSideDrawer={context.state.showSideDrawer}
                isLoggedIn={context.state.isLoggedIn}
                showLogoutModalHandler={context.showLogoutModalHandler}
              />
            )}
            {context.state.showSaveModal && (
              <SaveModal
                closeSaveModalHandler={context.closeSaveModalHandler}
                saveAudioOnline={context.saveAudioOnline}
                inputHandler={context.inputHandler}
                audioUrl={audioUrl}
              />
            )}
            {!converted && !converting && (
              <h6 className="text-center font-italic text-dark p-4" style={{ marginTop: '5rem' }}>
                Copy and paste your desired text into the text input, press the convert button and listen on the go!
              </h6>
            )}
            {converting && (
              <div className="container h-50 px-9 d-flex flex-column align-items-center justify-content-around mt-9 process-ctn rounded">
                <Loader converting={converting} />
              </div>
            )}
            {!converted && !converting && (
              <div className="container h-50 px-9 d-flex flex-column align-items-center justify-content-around mt-9 process-ctn rounded">
                <textarea
                  className="form-control h-50 text-area text-center w-75"
                  placeholder="Enter Text here"
                  onChange={this.textInputHandler}
                />
                <div className="container w-75 row p-3 convert-field">
                  <div className="col-md-8 d-flex align-items-center justify-content-center">
                    <Select
                      options={options}
                      className="text-capitalize w-100"
                      placeholder={<div>Select Voice</div>}
                      onChange={this.handleSelect}
                    />
                  </div>
                  <div className="col-md-4 d-flex align-items-center justify-content-center p-4">
                    <button className="btn btn-sm btn-dark" onClick={this.convertText}>
                      Convert to audio
                    </button>
                  </div>
                </div>
              </div>
            )}
            {converted && (
              <div
                className="container h-50 px-9 d-flex flex-column align-items-center justify-content-around process-ctn rounded"
                style={{ marginTop: '5rem' }}>
                <h3 className="converted-header">Converted successfully!</h3>
                <div className="p-5 d-flex align-items-center justify-content-around result-ctn">
                  <button
                    className="btn btn-sm btn-dark d-flex align-items-center justify-content-around p-2"
                    title="Stream audio"
                    onClick={this.streamHandler}>
                    <span className="mr-1 mt-1">Listen</span> <Headphones size={18} />
                  </button>
                  <button
                    className={
                      context.state.isLoggedIn
                        ? 'btn btn-sm btn-success d-flex align-items-center justify-content-around p-2'
                        : 'btn btn-sm btn-tertiary disabled d-flex align-items-center justify-content-around p-2'
                    }
                    title="Save online"
                    onClick={context.state.isLoggedIn ? context.showSaveModalHandler : this.loginRedirect}>
                    <span className="mr-1 mt-1">Save online</span> <Download size={18} />
                  </button>
                  <button
                    className={
                      context.state.isLoggedIn
                        ? 'btn btn-sm btn-success d-flex align-items-center justify-content-around p-2'
                        : 'btn btn-sm btn-tertiary disabled d-flex align-items-center justify-content-around p-2'
                    }
                    title="Save offline"
                    onClick={context.state.isLoggedIn ? context.showSaveModalHandler : this.loginRedirect}>
                    <span className="mr-1 mt-1">Save offline</span> <Download size={18} />
                  </button>
                  <button className="btn btn-sm btn-dark" title="Convert new" onClick={this.newConvertHandler}>
                    <RefreshCcw size={18} />
                  </button>
                </div>
              </div>
            )}
            {showProcessModal && <ProcessModal closeModal={this.closeModal} audioUrl={audioUrl} />}
            {context.state.showLogoutModal && (
              <LogoutModal
                closeLogoutModalHandler={context.closeLogoutModalHandler}
                closeSideDrawer={context.closeSideDrawer}
              />
            )}
            <Footer />
          </div>
        )}
      </Context.Consumer>
    )
  }
}
