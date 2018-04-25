import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import Enzyme, { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16'

import RemakesNew from '../../src/components/remakes_new'

// http://blog.ricardofilipe.com/post/react-enzyme-tdd-tutorial

// TODO: set up only once for all test files
Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())
// END TODO

describe('<RemakesNew/>', () => {
  const mockState = {
    remakes: {}
  }
  const mockStore = configureStore()
  const store = mockStore(mockState)

  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RemakesNew/>
        </MemoryRouter>
      </Provider>
    )
  })

  it('renders a container component', () => {
    expect(wrapper.find(RemakesNew).length).to.equal(1)
  })

  it('renders a class', () => {
    expect(wrapper.find('.remakes-new')).to.have.length(1)
  })
})
