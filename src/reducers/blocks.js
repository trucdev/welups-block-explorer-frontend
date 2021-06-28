import {
  BLOCKS_INIT,
  BLOCKS_UPDATE,
  PAGE_BLOCKS_INIT,
  PAGE_BLOCKS_UPDATE,
  PAGE_BLOCKS_TOTAL_UPDATE,
  PAGE_BLOCKS_LIMIT_UPDATE,
  PAGE_BLOCKS_START_UPDATE,
} from '../actions/blocks'

const initBlocks = []

export function blocksReducer(state = initBlocks, action) {
  switch (action.type) {
    case BLOCKS_UPDATE:
      return action.payload
    case BLOCKS_INIT:
      return initBlocks
    default:
      return state
  }
}

var initPageBlocks = {
  start_page: 1,
  start_item: 0,
  page_limit: 10,
  total_items: 10000,
  current_page: 1,
}

export function pageBlocksReducer(state = initPageBlocks, action) {
  switch (action.type) {
    case PAGE_BLOCKS_UPDATE:
      state.current_page = action.payload
      state.start_item -= (state.current_page - state.start_page) * state.page_limit
      state.start_page = action.payload
      return state
    case PAGE_BLOCKS_INIT:
      return initPageBlocks
    case PAGE_BLOCKS_TOTAL_UPDATE:
      state.total_items = action.payload
      return state
    case PAGE_BLOCKS_LIMIT_UPDATE:
      state.start_item -= (action.payload - state.page_limit) * (state.current_page - 1)
      state.page_limit = action.payload
      return state
    case PAGE_BLOCKS_START_UPDATE:
      state.start_item = action.payload
      return state
    default:
      return state
  }
}
