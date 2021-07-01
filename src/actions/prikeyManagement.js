import { notification } from 'antd'
import Account from '../api/account'
import { callAccoountApi } from './login'

export const LOAD_NONE = 'LOAD_NONE'
export const LOADING = 'LOADING'
export const FAIL = 'FAIL'
export const LOAD_PRIKEY_FROM_STORAGE = 'LOAD_PRIKEY_FROM_STORAGE'
export const DELETE_PRIKEY_FROM_STORAGE = 'DELETE_PRIKEY_FROM_STORAGE'
export const EDIT_PRIKEY_FROM_STORAGE = 'EDIT_PRIKEY_FROM_STORAGE'
export const ADD_TO_STORAGE = 'ADD_TO_STORAGE'
export const SET_SHOW_STATE = 'SET_SHOW_STATE'

export function loadPrikeyFromStorage(email) {
  let prikeys = JSON.parse(localStorage.getItem(email))
  return {
    type: LOAD_PRIKEY_FROM_STORAGE,
    payload: { prikeys, email },
  }
}
export function checkPassword(email, password) {
  return async (dispatch) => {
    dispatch(request())
    const res = await callAccoountApi({ email, password })
    if (res.data.code) {
      dispatch(fail())
      notification.error({
        message: 'Failed!',
        description: 'Wrong password!',
      })
    } else {
      dispatch(setShowState(true))
    }
  }
}
export function request() {
  return {
    type: LOADING,
  }
}
export function setShowState(value) {
  return {
    type: SET_SHOW_STATE,
    payload: value,
  }
}
export function add(prikey) {
  return {
    type: ADD_TO_STORAGE,
    payload: prikey,
  }
}
export function edit(prikey) {
  return {
    type: EDIT_PRIKEY_FROM_STORAGE,
    payload: prikey,
  }
}
export function fail() {
  return {
    type: FAIL,
  }
}
export function deletePriKey(index, email) {
  let prikeys = JSON.parse(localStorage.getItem(email))
  prikeys.splice(index, 1)
  localStorage.setItem(email, JSON.stringify(prikeys))
  return {
    type: DELETE_PRIKEY_FROM_STORAGE,
    payload: prikeys,
  }
}

export function editPriKey(index, prikey, email) {
  return (dispatch) => {
    try {
      prikey.address = Account.addressFromPrivateKey(prikey.prikey)
    } catch (e) {
      notification.error({
        message: 'Failed!',
        description: 'Invalid key!',
      })
      dispatch(fail())
      return
    }
    let prikeys = JSON.parse(localStorage.getItem(email))
    prikeys[index] = prikey
    localStorage.setItem(email, JSON.stringify(prikeys))
    notification.success({
      message: 'Success!',
      description: `Edit private key successfully!`,
    })
    dispatch(edit(prikeys))
  }
}

export function addToStorage(prikey, email) {
  return (dispatch) => {
    try {
      prikey.address = Account.addressFromPrivateKey(prikey.prikey)
    } catch (e) {
      notification.error({
        message: 'Failed!',
        description: 'Invalid key!',
      })
      dispatch(fail())
      return
    }
    var _prikeys = localStorage.getItem(email) ? JSON.parse(localStorage.getItem(email)) : []
    _prikeys.push(prikey)
    localStorage.setItem(email, JSON.stringify(_prikeys))
    notification.success({
      message: 'Success!',
      description: `Add private key successfully!`,
    })
    dispatch(add(_prikeys))
  }
}
