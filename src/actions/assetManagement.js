import fetch from 'cross-fetch';
import { API_ADDR } from '../config/config';

export const ASSET_INIT = 'ASSET_INIT';
export const ASSET_UPDATE = 'ASSET_UPDATE';

export function initAsset() {
	return {
		type: ASSET_INIT,
	}
}
export function updateAsset(assets) {
	console.log(assets);
	return {
		type: ASSET_UPDATE,
		payload: assets
	}
}
const loadAssetDetails = async (addr) => {
	const res = await fetch(`${API_ADDR}/accounts/${addr}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json', },
		mode: 'cors',
	});
	if (!res.ok) return undefined;
	const result = await res.json();

	if (result.status === "success") {
		return result.data
	}
	return undefined
}
export function loadAssetApi(id, token) {
	return async (dispatch) => {
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
				let assets = [];
				for (let index = 0; index < result.data.addresses.length; index++) {
					const addr = result.data.addresses[index];
					
					const assetInfo = await loadAssetDetails(addr);
					if (assetInfo !== undefined){
						assets.push(assetInfo)
					}
				}
				dispatch(updateAsset(assets));
				break;
			case "fail":
			case "error":
				break;
			default:
				break;
		}

	}
}