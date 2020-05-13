import '../Assets/css/main.css'

import React from 'react'
import { ArrowLeft } from 'react-feather'
import { Link } from 'react-router-dom'

import Alert from '../Components/Alert'
import Footer from '../Components/Footer'
import Context from '../Utils/Context'

const Register = () => {
  return (
    <Context.Consumer>
      {(context) => {
        const { inputHandler, userRegistrationHandler, onRouteChange } = context
        return (
          <div className="layout p-2 position-fixed vh-100 w-100">
            <Link to="/" className="back-arrow mt-4 ml-2 p-2" onClick={onRouteChange}>
              <ArrowLeft size={30} />
            </Link>
            <div className="container d-flex flex-column">
              <div className="row align-items-center justify-content-center no-gutters min-vh-100">
                <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                  <h1 className="font-bold text-center">Sign up</h1>

                  <div className="w-100">{context.state.showAlert && <Alert />}</div>

                  <form className="mb-6" onSubmit={userRegistrationHandler}>
                    <div className="form-group">
                      <label htmlFor="email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email address"
                        name="registerEmail"
                        onChange={inputHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="registerPassword"
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="sr-only">
                        Retype-password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Retype password"
                        name="registerPassword2"
                        onChange={inputHandler}
                      />
                    </div>

                    <button
                      className={
                        context.state.isLoading
                          ? 'btn btn-lg btn-block bg-dark loading'
                          : 'btn btn-lg btn-block btn-dark'
                      }
                      type="submit">
                      {context.state.isLoading ? <span>Creating account...</span> : <span>Sign up</span>}
                    </button>
                  </form>

                  <p className="text-center">
                    Already have an account?{' '}
                    <Link to="/login" onClick={onRouteChange}>
                      Sign in
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default Register
