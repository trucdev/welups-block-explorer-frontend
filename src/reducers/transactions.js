import {
  TRANSACTIONS_INIT,
  TRANSACTIONS_UPDATE,
  PAGE_TRANSACTIONS_INIT,
  PAGE_TRANSACTIONS_UPDATE,
  PAGE_TRANSACTIONS_TOTAL_UPDATE,
  PAGE_TRANSACTIONS_LIMIT_UPDATE,
} from '../actions/transactions'

const initTransactions = {
  transactions: [],
  transactionPage: {
    start_page: 1,
    start_item: 0,
    page_limit: 10,
    total_items: 10000,
    current_page: 1,
  },
}

export function transactionsReducer(state = initTransactions, action) {
  switch (action.type) {
    case TRANSACTIONS_UPDATE:
      state = { ...state, transactions: action.payload }
      break
    case TRANSACTIONS_INIT:
      break
    case PAGE_TRANSACTIONS_UPDATE:
      state.transactionPage.current_page = action.payload
      state.transactionPage.start_item +=
        (state.transactionPage.current_page - state.transactionPage.start_page) *
        state.transactionPage.page_limit
      state.transactionPage.start_page = action.payload
      break
    case PAGE_TRANSACTIONS_INIT:
      break
    case PAGE_TRANSACTIONS_TOTAL_UPDATE:
      state.transactionPage.total_items = action.payload
      break
    case PAGE_TRANSACTIONS_LIMIT_UPDATE:
      state.transactionPage.page_limit = action.payload
      state.transactionPage.start_item =
        (state.transactionPage.current_page - 1) * state.transactionPage.page_limit
      break
    default:
      break
  }
  return state
}
