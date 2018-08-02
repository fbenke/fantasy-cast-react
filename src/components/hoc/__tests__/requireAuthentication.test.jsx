import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import { Router, Route } from 'react-router-dom';
import history from 'helpers/history';
import { MockComponent } from 'helpers/tests';
import requireAuthentication from 'components/hoc/requireAuthentication';

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

it('shows component to authenticated user', () => {
  const initialState = {
    auth: { authenticated: true },
  };

  history.push('/mock');

  wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <Route path="/mock" component={requireAuthentication(MockComponent)} />
      </Router>
    </Root>,
  );

  expect(history.location.pathname).toEqual('/mock');
});

it('redirects anonymous user to home path', () => {
  const initialState = {
    auth: { authenticated: false },
  };

  history.push('/mock');

  wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <Route path="/mock" component={requireAuthentication(MockComponent)} />
      </Router>
    </Root>,
  );

  expect(history.location.pathname).toEqual('/');
});
