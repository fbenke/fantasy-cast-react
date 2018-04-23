import { renderComponent, expect } from '../test_helper'
import RemakesIndex from '../../src/components/remakes_index'
import { StaticRouter } from 'react-router'
import React, { Component } from 'react'

describe('RemakesIndex', () => {
  let component

  beforeEach(() => {
    component = renderComponent(RemakesIndex)
  })

  it('renders something', () => {
    expect(component.find('.remakes-index')).to.exist
  })
})
