import React from 'react';
import { shallow } from 'enzyme';
import Home from 'components/Home';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Home />);
});

it('has a heading and a jumbotron', () => {
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find('.jumbotron').length).toEqual(1);
});

it('has title and tagline', () => {
  expect(wrapped.find('h1').render().text()).toEqual('Fantasy Cast');
  expect(wrapped.find('p').render().text()).toEqual('Predict who is going to get famous roles in upcoming movies.');
});
