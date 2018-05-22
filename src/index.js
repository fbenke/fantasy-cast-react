import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import Home from './components/home'
import Navigation from './components/navigation'
import RemakesNew from './components/remakes_new'
import RemakesIndex from './components/remakes_index'
import RemakesShow from './components/remakes_show'
import requireAuth from './components/hoc/require_authentication'
import Signin from './components/auth/signin'
import Signup from './components/auth/signup'
import Signout from './components/auth/signout'
import { AUTH_USER } from './actions/types'
import '../style/style.css'

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route path="/remakes/add" component={requireAuth(RemakesNew)} />
            <Route path="/remakes/:id" component={requireAuth(RemakesShow)} />
            <Route path="/remakes" component={requireAuth(RemakesIndex)} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  </Provider>
  , document.querySelector('.container'))
