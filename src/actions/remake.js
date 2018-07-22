import axios from 'axios'

import { REMAKE_URL } from '../helpers/constants'

import {
  CREATE_REMAKE,
  FETCH_REMAKES,
  FETCH_REMAKE,
  FETCH_REMAKE_ERROR,
  DELETE_REMAKE,
  CLOSE_REMAKE,
  RESET_REMAKE
} from './types'

export function fetchRemakes () {
  const request = axios.get(`${REMAKE_URL}`)

  return {
    type: FETCH_REMAKES,
    payload: request
  }
}

export function createRemake (values, callback) {
  const request = axios.post(
    `${REMAKE_URL}add/`, values,
    {headers: { Authorization: `Token ${window.localStorage.getItem('token')}` }}
  )
    .then(() => callback())

  return {
    type: CREATE_REMAKE,
    payload: request
  }
}

export function fetchRemake (id) {
  return function (dispatch) {
    axios.get(`${REMAKE_URL}${id}`)
      .then(response => {
        dispatch({
          type: FETCH_REMAKE,
          payload: response
        })
      }).catch(error => {
        dispatch({
          type: FETCH_REMAKE_ERROR,
          payload: error
        })
      })
  }
}

export function resetRemake () {
  return {type: RESET_REMAKE}
}

export function deleteRemake (id, callback) {
  axios.delete(
    `${REMAKE_URL}${id}`,
    {headers: { Authorization: `Token ${window.localStorage.getItem('token')}` }}
  )
    .then(() => callback())

  return {
    type: DELETE_REMAKE,
    payload: id
  }
}

export function closeRemake (id, callback) {
  axios.get(
    `${REMAKE_URL}close/${id}`,
    {headers: { Authorization: `Token ${window.localStorage.getItem('token')}` }}
  )
    .then(() => callback())

  return {
    type: CLOSE_REMAKE,
    payload: id
  }
}
