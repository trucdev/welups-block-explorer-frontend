import {
    ASSET_INIT,
    ASSET_UPDATE,
} from '../actions/assetManagement';

const initAsset = {
    addresses:[]
}

export function assetManagementReducer(state = initAsset, action) {
    switch (action.type) {
        case ASSET_UPDATE:
            return {...state, addresses:action.payload};
        case ASSET_INIT:
            return initAsset;
        default:
            return state;
    }
}