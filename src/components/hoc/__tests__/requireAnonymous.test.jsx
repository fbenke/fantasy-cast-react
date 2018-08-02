import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import { Router, Route } from 'react-router-dom';
import history from 'helpers/history';
import { MockComponent } from 'helpers/tests';
import requireAnonymous from 'components/hoc/requireAnonymous';

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

it('shows component to anonymous user', () => {
  const initialState = {
    auth: { authenticated: false },
  };

  history.push('/mock');

  wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <Route path="/mock" component={requireAnonymous(MockComponent)} />
      </Router>
    </Root>,
  );

  expect(history.location.pathname).toEqual('/mock');
});

it('redirects authenticated user to home path', () => {
  const initialState = {
    auth: { authenticated: true },
  };

  history.push('/mock');

  wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <Route path="/mock" component={requireAnonymous(MockComponent)} />
      </Router>
    </Root>,
  );

  expect(history.location.pathname).toEqual('/');
});
