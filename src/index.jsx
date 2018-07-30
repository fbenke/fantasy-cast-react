import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import NewRemake from './components/remake/NewRemake';
import RemakesList from './components/remake/RemakesList';
import RemakeDetail from './components/remake/RemakeDetail';
import requireAuth from './components/hoc/require_authentication';
import requireAnonymous from './components/hoc/require_anonymous';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import history from './helpers/history';
import { AUTH_USER } from './actions/types';

import '../style/style.css';
import '../node_modules/react-widgets/dist/css/react-widgets.css';

const store = createStore(
  reducers,
  {},
  applyMiddleware(promise, reduxThunk),
);

const token = window.localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Navigation />
        <div className="row body">
          <div className="col-md-12">
            <Switch>
              <Route path="/signin" component={requireAnonymous(Signin)} />
              <Route path="/signup" component={requireAnonymous(Signup)} />
              <Route path="/signout" component={Signout} />
              <Route path="/remakes/add" component={requireAuth(NewRemake)} />
              <Route path="/remakes/:id" component={requireAuth(RemakeDetail)} />
              <Route path="/remakes" component={requireAuth(RemakesList)} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.querySelector('.container'),
);
