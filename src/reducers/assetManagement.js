import {
    ASSET_INIT,
    ASSET_UPDATE,
    ASSET_NEW_ADDR,
    ADDRESS_REQUESTING
} from '../actions/assetManagement';

const initAsset = {
    addresses:{}
}

export function assetManagementReducer(state = initAsset, action) {
    switch (action.type) {
        case ASSET_NEW_ADDR:
            let addresses = state.addresses;
            addresses[action.payload.address]=action.payload;
            return {...state, addresses:addresses, status: "none"}
        case ADDRESS_REQUESTING:
            return {...state, status: "requesting"};
        case ASSET_UPDATE:
            return {...state, addresses:action.payload, status: "none"};
        case ASSET_INIT:
            return {initAsset,  status: "none"}  ;
        default:
            return state;
    }
}