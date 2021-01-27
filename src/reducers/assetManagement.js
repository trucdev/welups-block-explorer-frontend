import {
    ASSET_INIT,
    ASSET_UPDATE,
    ASSET_NEW_ADDR,
} from '../actions/assetManagement';

const initAsset = {
    addresses:{}
}

export function assetManagementReducer(state = initAsset, action) {
    switch (action.type) {
        case ASSET_NEW_ADDR:
            let addresses = state.addresses;
            addresses[action.payload.address]=action.payload;
            return {...state, addresses:addresses}
        case ASSET_UPDATE:
            return {...state, addresses:action.payload};
        case ASSET_INIT:
            return initAsset;
        default:
            return state;
    }
}