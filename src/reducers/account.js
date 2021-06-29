import {
  ACCOUNT_DETAIL_INIT,
  ACCOUNT_DETAIL_UDPATE,
  ACCOUNT_DETAIL_REQUESTING,
} from '../actions/account'

const initAcc = {
  name: '',
  address: '',
  totalBalance: 0,
  acgBalance: 0,
  transactions: 0,
  transferred: 0,
  availableBalance: 0,
  netUsage: 0,
  bandwidthUsed: 0,
  bandwidthTotal: 0,
  updateTime: 0,
  frozenBalance: 0,
  energyTotal: 0,
  energyUsed: 0,
  asset: {},
}

export function accountReducer(state = initAcc, action) {
  switch (action.type) {
    case ACCOUNT_DETAIL_UDPATE:
      const froBalance = (accumulator, currentValue) => accumulator + currentValue.frozen_balance
      return {
        ...state,
        name: action.payload.name,
        address: action.payload.address,
        status: action.payload.is_dirty,
        totalBalance: action.payload.totalBalance,
        acgBalance: action.payload.token_balance,
        transactions: action.payload.transactions,
        createTime: action.payload.create_time,
        frozenBalance: action.payload.frozen_balance
          ? action.payload.frozen_balance.reduce(froBalance, 0)
          : 0,
        energyTotal: action.payload.energy_total,
        energyUsed: action.payload.energy_used,
        transNum: action.payload.num_of_trans,
        asset: action.payload.assets || {},
        bandwidthTotal: action.payload.band_width_total,
        bandwidthUsed: action.payload.band_width_used ? action.payload.band_width_used : '0',
        bandwidthLeft: action.payload.band_width_used
          ? action.payload.band_width_total - action.payload.band_width_used
          : action.payload.band_width_total,
        energyTotal: action.payload.energy_total,
        energyUsed: action.payload.energy_used,
        energyLeft: action.payload.energy_total - action.payload.energy_used,
      }
    case ACCOUNT_DETAIL_INIT:
      return initAcc
    case ACCOUNT_DETAIL_REQUESTING:
      return { ...state, status: 'REQUESTING' }
    default:
      return state
  }
}
