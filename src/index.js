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
import Footer from './components/footer'
import RemakesNew from './components/remake/new'
import RemakesIndex from './components/remake/index'
import RemakesShow from './components/remake/show'
import requireAuth from './components/hoc/require_authentication'
import Signin from './components/auth/signin'
import Signup from './components/auth/signup'
import Signout from './components/auth/signout'
import { AUTH_USER } from './actions/auth'

import '../style/style.css'
import '../node_modules/react-widgets/dist/css/react-widgets.css'

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navigation/>
        <div className="row" id="body">
          <div className="col-md-12">
            <Switch>
              <Route path="/signin" component={requireAuth(Signin, true)} />
              <Route path="/signup" component={requireAuth(Signup, true)} />
              <Route path="/signout" component={Signout} />
              <Route path="/remakes/add" component={requireAuth(RemakesNew, false)} />
              <Route path="/remakes/:id" component={requireAuth(RemakesShow, false)} />
              <Route path="/remakes" component={requireAuth(RemakesIndex, false)} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'))
