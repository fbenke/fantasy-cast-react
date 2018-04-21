import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import reducers from './reducers'
import RemakesNew from './components/remakes_new'
import RemakesIndex from './components/remakes_index'
import RemakesShow from './components/remakes_show'

import '../style/style.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/remakes/add" component={RemakesNew} />
          <Route path="/remakes/:id" component={RemakesShow} />
          <Route path="/" component={RemakesIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'))
