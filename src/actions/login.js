import fetch from 'cross-fetch'
import { API_ADDR } from '../config/config'
import { notification } from 'antd'
import jwt_decode from 'jwt-decode'
import { loadPrikeyFromStorage } from './prikeyManagement'

export const LOGIN_NONE = 'LOGIN_NONE'
export const LOGOUT = 'LOGOUT'
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOAD_FROM_STORAGE = 'LOAD_FROM_STORAGE'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export function loadFromStorage() {
  return (dispatch) => {
    let tokenDecoded = null
    let token = localStorage.getItem('token')
    try {
      tokenDecoded = jwt_decode(token)
    } catch (e) {}
    if (tokenDecoded && tokenDecoded.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      tokenDecoded = null
    }
    dispatch(
      load({
        token: token,
        tokenDecoded: tokenDecoded,
      })
    )
    if (tokenDecoded && tokenDecoded.email) {
      dispatch(loadPrikeyFromStorage(tokenDecoded.email))
    }
  }
}
export function load(tokens) {
  return {
    type: LOAD_FROM_STORAGE,
    payload: tokens,
  }
}
export function logout() {
  localStorage.removeItem('token')
  return {
    type: LOGOUT,
  }
}
export function reset() {
  return {
    type: LOGIN_NONE,
  }
}
export function request() {
  return {
    type: LOGIN_REQUESTING,
  }
}
export function success(status) {
  return {
    type: LOGIN_SUCCESS,
    payload: status,
  }
}
export function fail(email, code, password) {
  return {
    type: LOGIN_FAIL,
    payload: {
      email: email,
      code: code,
      password: password,
    },
  }
}
export function error(status, code) {
  return {
    type: LOGIN_ERROR,
    payload: {
      status: status,
      code: code,
    },
  }
}

export async function callAccoountApi(acc) {
  const res = await fetch(`${API_ADDR}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({
      email: acc.email,
      password: acc.password,
    }),
  })
  return await res.json()
}

export function checkAccountApi(acc) {
  return async (dispatch) => {
    dispatch(request())
    const result = await callAccoountApi(acc)
    var code = result.data.code
    var email = acc.email
    var password = acc.password
    if (result.data.code) {
      switch (result.data.code) {
        case 2:
          //has not active
          dispatch(fail(email, code, password))
          notification.warning({
            message: 'Account existed',
            description:
              'This account hasn not been activated, a verification code has been sent to your email, please check',
          })
          break
        case 3:
          //account not exist
          dispatch(error(email, code))
          notification.error({
            message: 'Log in failed!',
            description: 'Your email or password is invalid',
          })
          break
        case 1:
          //wrong password
          dispatch(error(email, code))
          notification.error({
            message: 'Log in failed!',
            description: 'Your email or password is invalid',
          })
          break
        default:
          break
      }
    } else {
      localStorage.setItem('token', result.data.token)
      let decoded = jwt_decode(result.data.token)
      result.data.id = decoded.id
      result.data.email = decoded.email
      dispatch(success(result.data))
      dispatch(loadPrikeyFromStorage(decoded.email))
    }
  }
}
