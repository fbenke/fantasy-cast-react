import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PropTypes from 'prop-types';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const propTypes = {
  children: PropTypes.shape({}).isRequired,
  initialState: PropTypes.shape({}),
};

const defaultProps = {
  initialState: {},
};

const Root = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(promise, reduxThunk),
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
