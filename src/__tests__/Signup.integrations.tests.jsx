import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';

import Root from 'Root';
import Signin from 'components/auth/Signin';
import { AUTH_URL } from 'helpers/constants';

let wrapped;

describe('unsuccessful signup', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(`${AUTH_URL}signin/`, {
      status: 400,
      response: { non_field_errors: ['foo'] },
    });
    wrapped = mount(
      <Root>
        <Signin />
      </Root>,
    );
  });

  afterEach(() => {
    moxios.uninstall();
    wrapped.unmount();
  });

  it('renders non-field errors', (done) => {
    wrapped.find('input[name="username"]').simulate('change', {
      target: { value: 'foo' },
    });
    wrapped.find('input[name="password"]').simulate('change', {
      target: { value: 'foo' },
    });

    wrapped.find('form').simulate('submit');

    moxios.wait(() => {
      wrapped.update();
      expect(wrapped.find('div.alert-danger').render().text()).toEqual('foo');
      done();
    });
  });
});
