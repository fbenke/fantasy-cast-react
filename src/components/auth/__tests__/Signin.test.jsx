import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import Signin from 'components/auth/Signin';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Signin />
    </Root>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has two text inputs', () => {
  expect(wrapped.find('input').length).toEqual(2);
  expect(wrapped.find('button').length).toEqual(1);
});
