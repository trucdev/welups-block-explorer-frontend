import {
  LOAD_NONE,
  LOADING,
  FAIL,
  LOAD_PRIKEY_FROM_STORAGE,
  ADD_TO_STORAGE,
  DELETE_PRIKEY_FROM_STORAGE,
  EDIT_PRIKEY_FROM_STORAGE,
} from '../actions/prikeyManagement'

export function prikeyManagementReducer(state = { type: LOAD_NONE, prikeys: [] }, action) {
  switch (action.type) {
    case LOAD_NONE:
      state = { type: action.type, prikeys: [] }
      break
    case FAIL:
      break
    case LOADING:
      state = { ...state, type: action.type }
      break
    case LOAD_PRIKEY_FROM_STORAGE:
      state = { type: action.type, prikeys: action.payload }
      break
    case DELETE_PRIKEY_FROM_STORAGE:
      state = { type: action.type, prikeys: action.payload }
      break
    case EDIT_PRIKEY_FROM_STORAGE:
      state = { type: action.type, prikeys: action.payload }
      break
    case ADD_TO_STORAGE:
      state = { type: action.type, prikeys: action.payload }
      break
    default:
      break
  }
  return state
}
