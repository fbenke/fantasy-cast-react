import React from 'react';
import { mount } from 'enzyme';
import { Field } from 'redux-form';
import Signup from 'components/auth/Signup';
import Root from 'Root';

let wrapped;


beforeEach(() => {
  wrapped = mount(
    <Root>
      <Signup />
    </Root>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('renders form, four fields, and a button', () => {
  expect(wrapped.find('form').length).toEqual(1);
  expect(wrapped.find(Field).length).toEqual(4);
  expect(wrapped.find('button').length).toEqual(1);
});

it('renders warnings for empty fields upon submit', () => {
  wrapped.find('form').simulate('submit');

  expect(wrapped.find('.has-danger').length).toEqual(4);

  wrapped.find('fieldset').forEach((node) => {
    expect(node.render().text()).toContain('Required');
  });

  expect(wrapped.find('input[name="email"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="email"]').hasClass('is-invalid')).toEqual(true);

  expect(wrapped.find('input[name="username"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="username"]').hasClass('is-invalid')).toEqual(true);

  expect(wrapped.find('input[name="password"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="password"]').hasClass('is-invalid')).toEqual(true);

  expect(wrapped.find('input[name="passwordRepeat"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="passwordRepeat"]').hasClass('is-invalid')).toEqual(true);
});

it('renders warning for empty email field upon focusout', () => {
  wrapped.find('input[name="email"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="email"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="email"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(0).find('div').render().text(),
  ).toEqual('Required');
});

it('renders warning for invalid email field upon focusout', () => {
  wrapped.find('input[name="email"]').simulate('change', {
    target: { value: 'foo' },
  });
  wrapped.find('input[name="email"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="email"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="email"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(0).find('div').render().text(),
  ).toEqual('Invalid email address');
});

it('renders warning for empty username field upon focusout', () => {
  wrapped.find('input[name="username"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="username"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="username"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(1).find('div').render().text(),
  ).toEqual('Required');
});

it('renders warning for empty password field upon focusout', () => {
  wrapped.find('input[name="password"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="password"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="password"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(2).find('div').render().text(),
  ).toEqual('Required');
});

it('renders warning for empty passwordRepeat field upon focusout', () => {
  wrapped.find('input[name="passwordRepeat"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="passwordRepeat"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="passwordRepeat"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(3).find('div').render().text(),
  ).toEqual('Required');
});

it('renders warning for password mismatch field upon focusout', () => {
  wrapped.find('input[name="password"]').simulate('change', {
    target: { value: 'foo' },
  });
  wrapped.find('input[name="passwordRepeat"]').simulate('change', {
    target: { value: 'bar' },
  });
  wrapped.find('input[name="passwordRepeat"]').simulate('blur');
  expect(wrapped.find('.has-danger').length).toEqual(1);
  expect(wrapped.find('input[name="passwordRepeat"]').parent().hasClass('has-danger')).toEqual(true);
  expect(wrapped.find('input[name="passwordRepeat"]').hasClass('is-invalid')).toEqual(true);
  expect(
    wrapped.find('form').childAt(3).find('div').render().text(),
  ).toEqual('Passwords don\'t match');
});
