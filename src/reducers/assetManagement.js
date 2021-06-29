import {
  ASSET_INIT,
  ASSET_UPDATE,
  ASSET_NEW_ADDR,
  ADDRESS_REQUESTING,
  ADDRESSES_UPDATE,
  ASSETS_REQUESTING,
  REQUEST_FAILED,
} from '../actions/assetManagement'

const initAsset = {
  addresses: {},
}

export function assetManagementReducer(state = initAsset, action) {
  switch (action.type) {
    case ASSET_NEW_ADDR:
      state.status = 'none'
      state.addresses[action.payload] = null
      return { ...state }
    case ADDRESS_REQUESTING:
      return { ...state, status: 'requesting' }
    case ASSET_UPDATE:
      state.status = 'none'
      state.addresses[action.payload.addr] = action.payload.assets
      return { ...state }
    case ADDRESSES_UPDATE:
      return { ...state, addresses: action.payload, status: 'none' }
    case ASSET_INIT:
      return { initAsset, status: 'none' }
    case ASSETS_REQUESTING:
      return { ...state, status: 'requesting-assets' }
    case REQUEST_FAILED:
      return { ...state, status: 'fail' }
    default:
      return state
  }
}
