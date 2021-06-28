import { notification } from 'antd'
import fetch from 'cross-fetch'
import { API_ADDR } from '../config/config'
import { checkAccountApi } from './login'
export const SIGNUP_NONE = 'SIGNUP_NONE'
export const SIGNUP_REQUESTING = 'SIGNUP_REQUESTING'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

export function request() {
  return { type: SIGNUP_REQUESTING }
}
export function success(status) {
  return {
    type: SIGNUP_SUCCESS,
    payload: status,
  }
}
export function fail(status) {
  return {
    type: SIGNUP_FAIL,
    payload: status,
  }
}

export function signUp(email, password) {
  return async (dispatch) => {
    dispatch(request())
    const res = await fetch(`${API_ADDR}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    const result = await res.json()
    result.email = email
    switch (result.status) {
      case 'success':
        dispatch(success(result))
        notification.success({
          message: 'Success!',
          description: `A verification code has been sent to your email`,
        })
        break
      case 'error':
        dispatch(fail())
        notification.warning({
          message: 'Error!',
          description: result.message ? result.message : '',
        })
        break
      default:
        break
    }
  }
}

export const ACTIVATE_NONE = 'ACTIVATE_NONE'
export const ACTIVATE_REQUESTING = 'ACTIVATE_REQUESTING'
export const ACTIVATE_SUCCESS = 'ACTIVATE_SUCCESS'
export const ACTIVATE_FAIL = 'ACTIVATE_FAIL'

export function requestActivate() {
  return {
    type: ACTIVATE_REQUESTING,
  }
}
export function failActivate() {
  return {
    type: ACTIVATE_FAIL,
  }
}
export function successActivate(status) {
  return {
    type: ACTIVATE_SUCCESS,
    payload: status,
  }
}
export function reset() {
  return { type: ACTIVATE_NONE }
}

export function activateMail(token, email, password) {
  return async (dispatch) => {
    dispatch(requestActivate())
    const res = await fetch(`${API_ADDR}/users/verify-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        verify_token: token,
        email: email,
      }),
    })
    const result = await res.json()
    if (!res.ok || result.status !== 'success') {
      dispatch(failActivate())
      notification.error({
        message: 'Failed',
        description: 'Your verification code is invalid',
      })
      return
    }
    dispatch(successActivate(result))
    notification.success({
      message: 'Success',
      description: 'Your account has been activated successfully',
    })
    var acc = {
      email: email,
      password: password,
    }
  }
}
