import {
  CONTRACTS_INIT,
  CONTRACTS_UPDATE,
  PAGE_CONTRACTS_INIT,
  PAGE_CONTRACTS_UPDATE,
  PAGE_CONTRACTS_TOTAL_UPDATE,
  PAGE_CONTRACTS_LIMIT_UPDATE,
} from '../actions/contracts'

const initContracts = {
  contracts: [],
  contractPage: {
    start_page: 1,
    start_item: 0,
    page_limit: 10,
    total_items: 10000,
    current_page: 1,
  },
}

export function contractsReducer(state = initContracts, action) {
  switch (action.type) {
    case CONTRACTS_UPDATE:
      state = { ...state, contracts: action.payload }
      break
    case CONTRACTS_INIT:
      break
    case PAGE_CONTRACTS_UPDATE:
      state.contractPage.current_page = action.payload
      state.contractPage.start_item +=
        (state.contractPage.current_page - state.contractPage.start_page) *
        state.contractPage.page_limit
      state.contractPage.start_page = action.payload
      break
    case PAGE_CONTRACTS_INIT:
      break
    case PAGE_CONTRACTS_TOTAL_UPDATE:
      state.contractPage.total_items = action.payload
      break
    case PAGE_CONTRACTS_LIMIT_UPDATE:
      state.contractPage.page_limit = action.payload
      state.contractPage.start_page = 1
      state.contractPage.start_item = 0
      state.contractPage.current_page = 1
      break
    default:
      break
  }
  return state
}
