import {
  LOAD_NONE,
  LOADING,
  FAIL,
  LOAD_PRIKEY_FROM_STORAGE,
  ADD_TO_STORAGE,
  DELETE_PRIKEY_FROM_STORAGE,
  EDIT_PRIKEY_FROM_STORAGE,
  SET_SHOW_STATE,
} from '../actions/prikeyManagement'

export function prikeyManagementReducer(
  state = { type: LOAD_NONE, prikeys: [], email: '', isShowPrikey: false },
  action
) {
  switch (action.type) {
    case LOAD_NONE:
      state = { type: action.type, prikeys: [], email: '', isShowPrikey: false }
      break
    case FAIL:
      state = { ...state, type: action.type }
      break
    case LOADING:
      state = { ...state, type: action.type }
      break
    case LOAD_PRIKEY_FROM_STORAGE:
      state = {
        ...state,
        type: action.type,
        prikeys: action.payload.prikeys,
        email: action.payload.email,
      }
      break
    case DELETE_PRIKEY_FROM_STORAGE:
      state = { ...state, type: action.type, prikeys: action.payload }
      break
    case EDIT_PRIKEY_FROM_STORAGE:
      state = { ...state, type: action.type, prikeys: action.payload }
      break
    case ADD_TO_STORAGE:
      state = { ...state, type: action.type, prikeys: action.payload }
      break
    case SET_SHOW_STATE:
      state = { ...state, type: action.type, isShowPrikey: action.payload }
      break
    default:
      break
  }
  return state
}
