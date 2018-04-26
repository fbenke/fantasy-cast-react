import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import reducers from './reducers'
import Home from './components/home'
import Navigation from './components/navigation'
import RemakesNew from './components/remakes_new'
import RemakesIndex from './components/remakes_index'
import RemakesShow from './components/remakes_show'

import '../style/style.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route path="/remakes/add" component={RemakesNew} />
            <Route path="/remakes/:id" component={RemakesShow} />
            <Route path="/remakes/" component={RemakesIndex} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  </Provider>
  , document.querySelector('.container'))
