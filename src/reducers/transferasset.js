import {
  TRANSFER_NONE,
  TRANSFER_REQUESTING,
  TRANSFER_SUCCESS,
  TRANSFER_FAIL,
  TRANSFER_TOKENS_INIT,
  TRANSFER_TOKENS_UPDATE,
  TRANSFER_PAGE_TOKENS_INIT,
  TRANSFER_PAGE_TOKENS_UPDATE,
  TRANSFER_PAGE_TOKENS_TOTAL_UPDATE,
} from '../actions/transferasset'

export function transferAssetReducer(
  state = {
    status: TRANSFER_NONE,
    tranID: '',
    message: '',
    tokens: [],
    pageToken: {
      start_item: 0,
      page_limit: 10,
      total_items: 10000,
    },
  },
  action
) {
  switch (action.type) {
    case TRANSFER_NONE:
      state = { ...state, status: action.type, message: '', tranID: '' }
      break
    case TRANSFER_REQUESTING:
      state = { ...state, status: action.type, message: 'Transfer is requesting', tranID: '' }
      break
    case TRANSFER_SUCCESS:
      state = {
        ...state,
        status: action.type,
        message: 'Transfer successed',
        tranID: action.payload.tranID,
      }
      break
    case TRANSFER_FAIL:
      state = { ...state, status: action.type, message: 'Transfer failed', tranID: '' }
      break
    case TRANSFER_TOKENS_UPDATE:
      action.payload.map((value, index) => {
        state.tokens = [...state.tokens, value]
      })
      return { ...state }
    case TRANSFER_TOKENS_INIT:
      return { ...state }
    case TRANSFER_PAGE_TOKENS_UPDATE:
      state.pageToken.start_item += state.pageToken.page_limit
      return { ...state }
    case TRANSFER_PAGE_TOKENS_INIT:
      return { ...state }
    case TRANSFER_PAGE_TOKENS_TOTAL_UPDATE:
      state.pageToken.total_items = action.payload
      return { ...state }
    default:
      break
  }
  return state
}
