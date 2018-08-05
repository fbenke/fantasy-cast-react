import moxios from 'moxios';
import { LocalStorageMock } from 'helpers/tests';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {
  signinUser,
  signupUser,
  signoutUser,
  getUserDetails,
} from 'actions/auth';
import {
  UNAUTH_USER,
  AUTH_USER,
  AUTH_ERROR,
  AUTH_DETAIL,
} from 'actions/types';
import { AUTH_URL } from 'helpers/constants';

const mockStore = configureMockStore([thunk, promise]);

global.localStorage = new LocalStorageMock();

describe('signinUser', () => {
  afterEach(() => {
    moxios.uninstall();
  });

  describe('success', () => {
    beforeEach(() => {
      window.localStorage.clear();
      moxios.install();
      moxios.stubRequest(`${AUTH_URL}signin/`, {
        status: 200,
        response: { token: 'foo' },
      });
    });

    it('has the correct type', (done) => {
      const store = mockStore({});
      store.dispatch(signinUser());
      moxios.wait(() => {
        try {
          expect(store.getActions()[0].type).toEqual(AUTH_USER);
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });

    it('sets the local storage token', (done) => {
      const store = mockStore({});
      store.dispatch(signinUser());
      moxios.wait(() => {
        try {
          expect(window.localStorage.getItem('token')).toEqual('foo');
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });
  });

  describe('failure', () => {
    beforeEach(() => {
      moxios.install();
      moxios.stubRequest(`${AUTH_URL}signin/`, {
        status: 400,
        response: { error: 'foo' },
      });
    });

    it('issues the correct type', (done) => {
      const store = mockStore({});
      store.dispatch(signinUser());
      moxios.wait(() => {
        try {
          expect(store.getActions()[0].type).toEqual(AUTH_ERROR);
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });

    it('issues the correct payload', (done) => {
      const store = mockStore({});
      store.dispatch(signinUser());
      moxios.wait(() => {
        try {
          expect(store.getActions()[0].payload).toEqual({ error: 'foo' });
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });
  });
});

describe('signupUser', () => {
  afterEach(() => {
    moxios.uninstall();
  });

  describe('success', () => {
    beforeEach(() => {
      window.localStorage.clear();
      moxios.install();
      moxios.stubRequest(`${AUTH_URL}signup/`, {
        status: 200,
        response: { token: 'foo' },
      });
    });

    it('has the correct type', (done) => {
      const store = mockStore({});
      store.dispatch(signupUser());
      moxios.wait(() => {
        try {
          expect(store.getActions()[0].type).toEqual(AUTH_USER);
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });

    it('sets the local storage token', (done) => {
      const store = mockStore({});
      store.dispatch(signupUser());
      moxios.wait(() => {
        try {
          expect(window.localStorage.getItem('token')).toEqual('foo');
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });
  });

  describe('failure', () => {
    beforeEach(() => {
      moxios.install();
      moxios.stubRequest(`${AUTH_URL}signup/`, {
        status: 400,
        response: { error: 'foo' },
      });
    });

    it('issues the correct type', (done) => {
      const store = mockStore({});
      store.dispatch(signupUser());
      moxios.wait(() => {
        try {
          expect(store.getActions()[0].type).toEqual(AUTH_ERROR);
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });

    it('issues the correct payload', (done) => {
      const store = mockStore({});
      store.dispatch(signupUser());
      moxios.wait(() => {
        try {
          expect(store.getActions()[0].payload).toEqual({ error: 'foo' });
        } catch (err) {
          done.fail(new Error(err));
        }
        done();
      });
    });
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
    moxios.stubRequest(`${AUTH_URL}detail/`, {
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
