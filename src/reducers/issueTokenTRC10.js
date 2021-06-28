import {
  ISSUE_TRC10_NONE,
  ISSUE_TRC10_REQUESTING,
  ISSUE_TRC10_SUCCESS,
  ISSUE_TRC10_FAIL,
} from '../actions/issueTokenTRC10'

const initState = { status: ISSUE_TRC10_NONE, tranID: '', message: '' }

export function issueTokenTRC10Reducer(state = initState, action) {
  switch (action.type) {
    case ISSUE_TRC10_NONE:
      state = { status: action.type, message: '', tranID: '' }
      break
    case ISSUE_TRC10_REQUESTING:
      state = { status: action.type, message: 'Issue TRC10 is requesting', tranID: '' }
      break
    case ISSUE_TRC10_SUCCESS:
      state = {
        status: action.type,
        message: 'Transaction successed',
        tranID: action.payload.tranID,
      }
      break
    case ISSUE_TRC10_FAIL:
      state = { status: action.type, message: 'Transaction failed', tranID: '' }
      break
    default:
      break
  }
  return state
}
