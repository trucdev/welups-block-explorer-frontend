import fetch from 'cross-fetch';
import {API_ADDR} from '../config/config';

export const ASSET_INIT = 'ASSET_INIT';
export const ASSET_UPDATE = 'ASSET_UPDATE';

export function initAsset() {
    return {
        type: ASSET_INIT,
    }
}
export function updateAsset(assets){
    return {
        type: ASSET_UPDATE,
        payload: assets
    }
}
