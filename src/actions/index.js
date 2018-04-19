import axios from 'axios'
export const CREATE_REMAKE = 'create_remake'
export const FETCH_REMAKES = 'fetch_remakes'
export const FETCH_REMAKE = 'fetch_remake'
export const DELETE_REMAKE = 'delete_remake'

const ROOT_URL = `${process.env.API_URL}api/remakes/`

export function fetchRemakes () {
  const request = axios.get(`${ROOT_URL}`)

  return {
    type: FETCH_REMAKES,
    payload: request
  }
}

export function createRemake (values, callback) {
  const request = axios.post(`${ROOT_URL}`, values)
    .then(() => callback())

  return {
    type: CREATE_REMAKE,
    payload: request
  }
}

export function fetchRemake (id) {
  const request = axios.get(`${ROOT_URL}${id}`)

  return {
    type: FETCH_REMAKE,
    payload: request
  }
}

export function deleteRemake (id, callback) {
  axios.delete(`${ROOT_URL}${id}`)
    .then(() => callback())

  return {
    type: DELETE_REMAKE,
    payload: id
  }
}
