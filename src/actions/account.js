import fetch from 'cross-fetch'

import { API_ADDR } from '../config/config'
export const ACCOUNT_DETAIL_INIT = 'ACCOUNT_DETAIL_INIT'
export const ACCOUNT_DETAIL_UDPATE = 'ACCOUNT_DETAIL_UDPATE'
export const ACCOUNT_DETAIL_REQUESTING = 'ACCOUNT_DETAIL_REQUESTING'

export function initAccountDetail() {
  return {
    type: ACCOUNT_DETAIL_INIT,
  }
}
export function updateAccountDetails(acc) {
  return {
    type: ACCOUNT_DETAIL_UDPATE,
    payload: acc,
  }
}
export function requestAccountDetails() {
  return {
    type: ACCOUNT_DETAIL_REQUESTING,
  }
}

export function loadAccountDetails(addr) {
  return (dispatch) => {
    dispatch(requestAccountDetails())
    dispatch(initAccountDetail())
    fetch(`${API_ADDR}/accounts/${addr}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(updateAccountDetails(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
