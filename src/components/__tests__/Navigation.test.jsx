import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import { Router } from 'react-router-dom';
import history from 'helpers/history';

import Navigation from 'components/Navigation';

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

describe('for anonymous user', () => {
  beforeEach(() => {
    const initialState = {
      auth: { authenticated: true },
    };

    wrapped = mount(
      <Root initialState={initialState}>
        <Router history={history}>
          <Navigation />
        </Router>
      </Root>,
    );
  });

  it('has a Home link', () => {
    expect(wrapped.find('a .navbar-brand').render().text()).toEqual('Home');
  });

  it('has all singin-protected links', () => {
    expect(wrapped.find('li').length).toEqual(3);
    expect(wrapped.find('ul').childAt(0).render().text()).toEqual('Remakes');
    expect(wrapped.find('ul').childAt(1).render().text()).toEqual('Add a remake');
    expect(wrapped.find('ul').childAt(2).render().text()).toEqual('Sign Out');
  });
});

describe('for signed in user', () => {
  beforeEach(() => {
    const initialState = {
      auth: { authenticated: false },
    };

    wrapped = mount(
      <Root initialState={initialState}>
        <Router history={history}>
          <Navigation />
        </Router>
      </Root>,
    );
  });

  it('has a Home link', () => {
    expect(wrapped.find('a .navbar-brand').render().text()).toEqual('Home');
  });

  it('has all singin-protected links', () => {
    expect(wrapped.find('li').length).toEqual(2);
    expect(wrapped.find('ul').childAt(0).render().text()).toEqual('Sign Up');
    expect(wrapped.find('ul').childAt(1).render().text()).toEqual('Sign In');
  });
});
