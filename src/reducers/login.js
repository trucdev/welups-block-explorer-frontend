import {
  LOGIN_NONE,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_FROM_STORAGE,
  LOGOUT,
  LOGIN_ERROR,
} from '../actions/login'

export function loginReducer(
  state = {
    type: LOGIN_NONE,
    status: '',
    message: '',
    description: '',
    token: '',
    id: '',
    email: '',
    code: '',
    password: '',
  },
  action
) {
  switch (action.type) {
    case LOGIN_NONE:
      state = {
        type: action.type,
        status: '',
        message: '',
        description: '',
        token: '',
        email: '',
        id: '',
      }
      break
    case LOGIN_REQUESTING:
      state = {
        type: action.type,
        status: 'login is requesting',
        message: '',
        description: '',
        token: '',
        email: '',
        id: '',
      }
      break
    case LOGIN_SUCCESS:
      state = {
        type: action.type,
        status: 'success',
        message: 'successed',
        description: '',
        token: action.payload.token,
        email: action.payload.email,
        id: action.payload.id,
      }
      break
    case LOGIN_FAIL:
      state = {
        type: action.type,
        code: action.payload.code,
        password: action.payload.password,
        status: LOGIN_FAIL,
        message: 'failed',
        description: 'user or password invalid',
        token: '',
        email: action.payload.email,
        id: '',
      }
      break
    case LOAD_FROM_STORAGE:
      state = action.payload.tokenDecoded
        ? {
            type: action.type,
            status: '',
            message: '',
            description: '',
            token: action.payload.token,
            email: action.payload.tokenDecoded.email,
            id: action.payload.tokenDecoded.id,
          }
        : { type: LOGOUT, status: '', message: '', description: '', token: '', email: '', id: '' }
      break
    case LOGOUT:
      state = {
        type: action.type,
        status: '',
        message: '',
        description: '',
        token: '',
        email: '',
        id: '',
      }
      break
    case LOGIN_ERROR:
      state = { ...state, type: action.type, status: 'error', code: action.payload.code }
      break
    default:
      break
  }
  return state
}
