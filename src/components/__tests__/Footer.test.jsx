import React from 'react';
import { shallow } from 'enzyme';
import Footer from 'components/Footer';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Footer />);
});

it('has two images', () => {
  expect(wrapped.find('img').length).toEqual(2);
});

it('has correct credit information', () => {
  expect(wrapped.render().text()).toContain(
    'Information courtesy of IMDb. Used with permission.',
  );
  expect(wrapped.render().text()).toContain(
    'This product uses the TMDb API but is not endorsed or certified by TMDb.',
  );
});
