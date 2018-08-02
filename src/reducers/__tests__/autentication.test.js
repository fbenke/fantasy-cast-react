import authenticationReducer from 'reducers/authentication';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_DETAIL,
} from 'actions/types';

it('returns the initial state', () => {
  expect(authenticationReducer(undefined, {})).toEqual({
    errors: {},
    user: {},
    authenticated: false,
  });
});

it('handles actions of type AUTH_USER', () => {
  const action = {
    type: AUTH_USER,
  };
  const INITIAL_STATE = {
    errors: { foo: 'foo' },
    user: {},
    authenticated: false,
  };
  const newState = authenticationReducer(INITIAL_STATE, action);
  expect(newState.authenticated).toEqual(true);
  expect(newState.errors).toEqual({});
});

it('handles actions of type UNAUTH_USER', () => {
  const action = {
    type: UNAUTH_USER,
  };
  const INITIAL_STATE = {
    authenticated: true,
  };
  const newState = authenticationReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    errors: {},
    user: {},
    authenticated: false,
  });
});

it('handles actions of type AUTH_ERROR', () => {
  const action = {
    type: AUTH_ERROR,
    payload: { foo: 'foo' },
  };
  const INITIAL_STATE = {
    errors: {},
  };
  const newState = authenticationReducer(INITIAL_STATE, action);
  expect(newState.errors).toEqual({ foo: 'foo' });
});

it('handles actions of type AUTH_DETAIL', () => {
  const action = {
    type: AUTH_DETAIL,
    payload: { data: { foo: 'foo' } },
  };
  const INITIAL_STATE = {
    user: {},
  };
  const newState = authenticationReducer(INITIAL_STATE, action);
  expect(newState.user).toEqual({ foo: 'foo' });
});
