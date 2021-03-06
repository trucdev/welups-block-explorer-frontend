import { TRANSACTION_DETAIL_INIT, TRANSACTION_DETAIL_UDPATE } from '../actions/transaction'

const initTran = {
  hash: '',
  blockNum: 0,
  contractAddr: '',
  result: '',
  timestamp: 0,
  numOfBlocks: 0,
  confirmed: '',
  contract: {
    type: '',
    parameter: {
      type_url: '',
      value: '',
      raw: {},
    },
  },
}
export function transactionReducer(state = initTran, action) {
  switch (action.type) {
    case TRANSACTION_DETAIL_UDPATE:
      return {
        ...state,
        hash: action.payload.hash,
        blockNum: action.payload.block_number,
        contractAddr: action.payload.contract_address,
        result: action.payload.ret,
        timestamp: action.payload.timestamp,
        numOfBlocks: action.payload.num_of_blocks,
        contract: action.payload.contract,
        confirmed: action.payload.confirmed,
      }
    case TRANSACTION_DETAIL_INIT:
      return initTran
    default:
      return state
  }
}
