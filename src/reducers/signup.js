import {
  SIGNUP_NONE,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUESTING,
  ACTIVATE_NONE,
  ACTIVATE_REQUESTING,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
} from '../actions/signup'

export function signUpReducer(state = { type: SIGNUP_NONE, status: '', email: '' }, action) {
  switch (action.type) {
    case SIGNUP_NONE:
      state = { type: action.type, status: '', email: '' }
      break
    case SIGNUP_REQUESTING:
      state = { type: action.type, status: SIGNUP_REQUESTING, email: '' }
      break
    case SIGNUP_SUCCESS:
      state = { type: action.type, status: SIGNUP_SUCCESS, email: action.payload.email }
      break
    case SIGNUP_FAIL:
      state = { type: action.type, status: SIGNUP_FAIL, email: '' }
      break
    default:
      break
  }
  return state
}

export function activateMailReducer(state = { type: ACTIVATE_NONE, status: '' }, action) {
  switch (action.type) {
    case ACTIVATE_NONE:
      state = { type: action.type, status: '' }
      break
    case ACTIVATE_REQUESTING:
      state = { type: action.type, status: 'requesting' }
      break
    case ACTIVATE_SUCCESS:
      state = { type: action.type, status: 'success' }
      break
    case ACTIVATE_FAIL:
      state = { type: action.type, status: 'fail' }
      break
    default:
      break
  }
  return state
}
