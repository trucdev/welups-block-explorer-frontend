import Asset from '../api/asset';
import { notification } from 'antd';
import { API_ADDR } from '../config/config';

export const TRANSFER_NONE = 'TRANSFER_NONE';
export const TRANSFER_REQUESTING = 'TRANSFER_REQUESTING';
export const TRANSFER_SUCCESS = 'TRANSFER_SUCCESS';
export const TRANSFER_FAIL = 'TRANSFER_FAIL';
export function reset(){
	return {
		type: TRANSFER_NONE,
	}
}
export function request() {
	return {
		type: TRANSFER_REQUESTING,
	}
}
export function success(tranID) {
	return {
		type: TRANSFER_SUCCESS,
		payload: {
			tranID:tranID,
		},
	}
}
export function fail() {
	return {
		type: TRANSFER_FAIL,
	}
}


export function transferAsset(fromPrivKey, to, amount, assetName) {
	return async (dispatch)=> {
		dispatch(request())
		const res = await Asset.transfer(fromPrivKey, to, amount, assetName);
		if (!res.result){
			dispatch(fail())
			notification.error({
				message: 'Failed!',
				description: `Transfer has failed`,
			});
			return
		}
		//Success
		dispatch(success(res.tranID));
	}
}

export const TRANSFER_TOKENS_INIT = 'TRANSFER_TOKENS_INIT';
export const TRANSFER_TOKENS_UPDATE = 'TRANSFER_TOKENS_UPDATE';


export function initTokens() {
	return {
		type: TRANSFER_TOKENS_INIT,
	}
}
export function updateTokens(tokens) {
	return {
		type: TRANSFER_TOKENS_UPDATE,
		payload: tokens
	}
}

export function loadTokens(offset, limit) {
	return (dispatch) => {
		fetch(`${API_ADDR}/assets?offset=${offset}&limit=${limit}`, {
			method: 'GET',
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(updatePageTokensTotal(res.data[0].total_assets));
			var tokens = res.data?res.data.map((token, index)=>{return token.name}):[];
			dispatch(updateTokens(tokens));
		}).catch(err => {
			console.log(err);
		})
	}
}

export const TRANSFER_PAGE_TOKENS_INIT = 'TRANSFER_PAGE_TOKENS_INIT';
export const TRANSFER_PAGE_TOKENS_UPDATE = 'TRANSFER_PAGE_TOKENS_UPDATE';
export const TRANSFER_PAGE_TOKENS_TOTAL_UPDATE = 'TRANSFER_PAGE_TOKENS_TOTAL_UPDATE';

export function initPageTokens() {
	return {
		type: TRANSFER_PAGE_TOKENS_INIT,
	}
}
export function updatePageTokens() {
	return {
		type: TRANSFER_PAGE_TOKENS_UPDATE,
	}
}

export function updatePageTokensTotal(total) {
	return {
		type: TRANSFER_PAGE_TOKENS_TOTAL_UPDATE,
		payload: total
	}
}