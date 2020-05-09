import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from './App'
import Library from './Pages/Library'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Provider from './Utils/Provider'

const Routes = () => {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/library" component={Library} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Provider>
  )
}

export default Routes
