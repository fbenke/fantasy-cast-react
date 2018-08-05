import moxios from 'moxios';
import React from 'react';
import { mount } from 'enzyme';
import { LocalStorageMock } from 'helpers/tests';
import Signout from 'components/auth/Signout';

import Root from 'Root';
import { AUTH_URL } from 'helpers/constants';

let wrapped;

global.localStorage = new LocalStorageMock();

beforeEach(() => {
  window.localStorage.setItem('token', 'foo');
  moxios.install();
  moxios.stubRequest(`${AUTH_URL}signout/`, { status: 200 });
  wrapped = mount(
    <Root>
      <Signout />
    </Root>,
  );
});

afterEach(() => {
  wrapped.unmount();
  moxios.install();
});

it('renders signout message', () => {
  expect(wrapped.find('div').length).toEqual(1);
  expect(wrapped.find('div').render().text()).toEqual('Sorry to see you go ..');
});

it('removes the local storage token', () => {
  wrapped.update();
  expect(window.localStorage.getItem('token')).toEqual(null);
});
