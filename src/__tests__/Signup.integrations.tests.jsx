import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Signup from 'components/auth/Signup';
import Root from 'Root';

let wrapped;

beforeEach(() => {
  moxios.install();
  wrapped = mount(
    <Root>
      <Signup />
    </Root>,
  );

  wrapped.find('input[name="username"]').simulate('change', {
    target: { value: 'foo' },
  });

  wrapped.find('input[name="email"]').simulate('change', {
    target: { value: 'foo@mail.com' },
  });

  wrapped.find('input[name="password"]').simulate('change', {
    target: { value: 'foo' },
  });

  wrapped.find('input[name="passwordRepeat"]').simulate('change', {
    target: { value: 'foo' },
  });
});

afterEach(() => {
  moxios.uninstall();
  wrapped.unmount();
});

it('renders email error', (done) => {
  wrapped.find('form').simulate('submit');

  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: { email: ['foo'] },
    }).then(() => {
      wrapped.update();
      try {
        expect(wrapped.find('form').childAt(0).find('div').render()
          .text()).toEqual('foo');
      } catch (err) {
        done.fail(new Error(err));
      }
      done();
    });
  });
});

it('renders username error', (done) => {
  wrapped.find('form').simulate('submit');

  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: { username: ['foo'] },
    }).then(() => {
      wrapped.update();
      try {
        expect(wrapped.find('form').childAt(1).find('div').render()
          .text()).toEqual('foo');
      } catch (err) {
        done.fail(new Error(err));
      }
      done();
    });
  });
});

it('renders username error', (done) => {
  wrapped.find('form').simulate('submit');

  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: { password: ['foo'] },
    }).then(() => {
      wrapped.update();
      try {
        expect(wrapped.find('form').childAt(2).find('div').render()
          .text()).toEqual('foo');
      } catch (err) {
        done.fail(new Error(err));
      }
      done();
    });
  });
});
