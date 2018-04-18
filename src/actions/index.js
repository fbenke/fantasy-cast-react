import axios from 'axios'
export const CREATE_REMAKE = 'create_remake'
export const FETCH_REMAKES = 'fetch_remakes'

const ROOT_URL = 'http://localhost:8888/api/remakes/'

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
