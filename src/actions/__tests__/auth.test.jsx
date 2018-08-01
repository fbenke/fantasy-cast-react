import moxios from 'moxios';
import LocalStorageMock from 'helpers/tests';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import {
  authError,
  signoutUser,
  getUserDetails,
} from 'actions/auth';

import {
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_DETAIL,
} from 'actions/types';


const mockStore = configureMockStore([thunk, promise]);

global.localStorage = new LocalStorageMock();

describe('authError', () => {
  it('has the correct type', () => {
    const action = authError({ foo: 'foo' });
    expect(action.type).toEqual(AUTH_ERROR);
  });

  it('has the correct payload', () => {
    const action = authError({ foo: 'foo' });
    expect(action.payload).toEqual({ foo: 'foo' });
  });
});

describe('signoutUser', () => {
  beforeEach(() => {
    window.localStorage.setItem('token', 'foo');
  });

  it('has the correct type', () => {
    const action = signoutUser();
    expect(action.type).toEqual(UNAUTH_USER);
  });

  it('has the correct payload', () => {
    const action = signoutUser();
    expect(action.payload).toEqual(undefined);
  });

  it('removes the local storage token', () => {
    expect(window.localStorage.getItem('token')).toEqual('foo');
    signoutUser();
    expect(window.localStorage.getItem('token')).toEqual(null);
  });
});

describe('getUserDetails', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('http://localhost:8888/api/account/detail/', {
      status: 200,
      response: { foo: 'bar' },
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('has the correct type', () => {
    const action = getUserDetails();
    expect(action.type).toEqual(AUTH_DETAIL);
  });

  it('has the correct payload', () => {
    const store = mockStore({});
    return store.dispatch(getUserDetails()).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload.data).toMatchObject({ foo: 'bar' });
    });
  });
});
