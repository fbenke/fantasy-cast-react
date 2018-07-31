import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import Signin from 'components/auth/Signin';


beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://localhost:8888/api/account/signin/', {
    status: 200,
    response: { token: 'foo' },
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can sign in a user', (done) => {
  const wrapped = mount(
    <Root>
      <Signin />
    </Root>,
  );

  wrapped.find('button').simulate('click');
  moxios.wait(() => {
    // wrapped.update();
    // expect(wrapped.find('li').length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
