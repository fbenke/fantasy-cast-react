import React from 'react';
import { mount } from 'enzyme';
import { Field } from 'redux-form';
import Signin from 'components/auth/Signin';
import Root from 'Root';

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

it('renders form, two fields, and a button', () => {
  expect(wrapped.find('form').length).toEqual(1);
  expect(wrapped.find(Field).length).toEqual(2);
  expect(wrapped.find('button').length).toEqual(1);
});

it('renders warning for empty username field upon submit', () => {
  wrapped.find('input[name="password"]').simulate('change', {
    target: { value: 'foo' },
  });
  wrapped.find('form').simulate('submit');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="username"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="username"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(0).find('div').render().text(),
  ).toEqual('Required');
});

it('renders warning for empty password field upon submit', () => {
  wrapped.find('input[name="username"]').simulate('change', {
    target: { value: 'foo' },
  });
  wrapped.find('form').simulate('submit');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="password"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="password"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(1).find('div').render().text(),
  ).toEqual('Required');
});

it('renders warning for empty username field upon focusout', () => {
  wrapped.find('input[name="username"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="username"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="username"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(0).find('div').render().text(),
  ).toEqual('Required');
});

it('renders warning for empty password field upon focusout', () => {
  wrapped.find('input[name="password"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="password"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="password"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(1).find('div').render().text(),
  ).toEqual('Required');
});
