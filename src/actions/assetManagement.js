import fetch from 'cross-fetch';
import { API_ADDR } from '../config/config';
import Account from '../api/account';
import { notification } from 'antd';
export const ASSET_INIT = 'ASSET_INIT';
export const ASSET_UPDATE = 'ASSET_UPDATE';
export const ADDRESSES_UPDATE = 'ADDRESSES_UPDATE';
export const ASSET_NEW_ADDR = 'ASSET_NEW_ADDR';
export const ADDRESS_REQUESTING = 'ADDRESS_REQUESTING';
export function initAsset() {
	return {
		type: ASSET_INIT,
	}
}
export function updateAsset(assets, addr) {
	return {
		type: ASSET_UPDATE,
		payload:{
			assets: assets,
			addr:addr
		}	
	}
}

export function updateAddresses(addresses) {
	return {
		type: ADDRESSES_UPDATE,
		payload: addresses
	}
}

export function newAddress(assetInfo) {
	return {
		type: ASSET_NEW_ADDR,
		payload: assetInfo
	}
}
export function addAddrFromPrvkey(id, token, privateKey) {
	return async (dispatch) => {
		//extract address from privatekey
		const addr = Account.addressFromPrivateKey(privateKey);
		const res = await fetch(`${API_ADDR}/users/${id}/addresses`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `bearer ${token}`
			},
			mode: 'cors',
			body: JSON.stringify({
				"address": addr
			})
		});
		if (!res.ok) {
			//TODO: notification error
			notification.error({
				message: 'Add asset failed!',
				description: `Add asset failed ${addr}`,
			});
			return
		}
		const result = await res.json();
		switch (result.status) {
			case "success":
				const assetInfo = await loadAssetDetails(addr);
				if (assetInfo !== undefined) {
					return dispatch(newAddress(assetInfo));
				}
				//TODO: notification error
				notification.error({
					message: 'Add asset failed!',
					description: `Add asset failed ${addr}`,
				});
				break;
			case "fail":
			case "error":
				break;
			default:
				break;
		}
	}
}
export function loadAssetDetails(addr){
	return async (dispatch) =>{
		const res = await fetch(`${API_ADDR}/accounts/${addr}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', },
			mode: 'cors',
		}); 
		if (!res.ok) return undefined;
		const result = await res.json();

		if (result.status === "success") {
			dispatch(updateAsset(result.data, addr));
		}
	}
}

export function loadAssetApi(id, token) {
	return async (dispatch) => {
		dispatch(request())
		const res = await fetch(`${API_ADDR}/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `bearer ${token}`
			},
			mode: 'cors',
		});
		if (!res.ok) {
			return;
		}
		const result = await res.json();

		switch (result.status) {
			case "success":
				//Fetch assets of the current user
				let addresses = {};
				for (let index = 0; index < result.data.addresses.length; index++) {
					const addr = result.data.addresses[index];
					addresses[addr]= null;
				}
				dispatch(updateAddresses(addresses));
				break;
			case "fail":
			case "error":
				break;
			default:
				break;
		}

	}
}
export function request(assets) {
	return {
		type: ADDRESS_REQUESTING,
		payload: assets
	}
}