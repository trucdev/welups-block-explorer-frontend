import {
    TOKEN_DETAIL_INIT,
    TOKEN_DETAIL_UPDATE,
} from '../actions/token';

const initToken = {
    id: "",
    owner_address: "",
    name: "",
    abbr: "",
    description: "",
    total_supply: 0,
    total_assets: 0,
    frozen_supply: 0,
    trx_num: 0,
    precision: 0,
    num: 0,
    start_time: 0,
    end_time: 0,
    order: 0,
    vote_scroll: 0,
    url: "",
    free_asset_net_limit: 0,
    public_free_asset_net_limit: 0,
}

export function tokenReducer(state = initToken, action) {
    switch (action.type) {
        case TOKEN_DETAIL_UPDATE:
            return action.payload;
        case TOKEN_DETAIL_INIT:
            return initToken;
        default:
            return state;

    }
}