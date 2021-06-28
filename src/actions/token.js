import fetch from 'cross-fetch'
import { API_ADDR } from '../config/config'

export const TOKEN_DETAIL_INIT = 'TOKEN_DETAIL_INIT'
export const TOKEN_DETAIL_UPDATE = 'TOKEN_DETAIL_UPDATE'

export function initTokenDetail() {
  return {
    type: TOKEN_DETAIL_INIT,
  }
}
export function updateTokenDetail(token) {
  return {
    type: TOKEN_DETAIL_UPDATE,
    payload: token,
  }
}

export function loadTokenDetail(id) {
  return (dispatch) => {
    dispatch(initTokenDetail())
    fetch(`${API_ADDR}/assets/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(updateTokenDetail(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
