import {
  signoutUser,
  authError,
} from 'actions/auth';

import {
  UNAUTH_USER,
  AUTH_ERROR,
} from 'actions/types';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

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
