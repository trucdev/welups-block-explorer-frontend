import {
  FREEZE_BALANCE_NONE,
  FREEZE_BALANCE_REQUESTING,
  FREEZE_BALANCE_SUCCESS,
  FREEZE_BALANCE_FAIL,
} from '../actions/freezeBalance'

export function freezeBalanceReducer(
  state = { status: FREEZE_BALANCE_NONE, tranID: '', message: '' },
  action
) {
  switch (action.type) {
    case FREEZE_BALANCE_NONE:
      state = { status: action.type, message: '', tranID: '' }
      break
    case FREEZE_BALANCE_REQUESTING:
      state = { status: action.type, message: 'Freeze balance is requesting', tranID: '' }
      break
    case FREEZE_BALANCE_SUCCESS:
      state = {
        status: action.type,
        message: 'Freeze balance successed',
        tranID: action.payload.tranID,
      }
      break
    case FREEZE_BALANCE_FAIL:
      state = { status: action.type, message: 'Freeze balance failed', tranID: '' }
      break
    default:
      break
  }
  return state
}
