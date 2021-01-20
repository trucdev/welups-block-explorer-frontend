import { API_ADDR } from '../config/config';
import fetch from 'cross-fetch';

export const TRANSFER_DEFAULT = 'TRANSFER_DEFAULT';
export const TRANSFER_LOAD = 'TRANSFER_LOAD';

export function defaultTransfer() {
	return {
		type: TRANSFER_DEFAULT,
	}
}

export function loadTransfer(transfer) {
	return {
		type: TRANSFER_LOAD,
		transfer:transfer
	}
}

export function loadTransferApi(id) {
	return (dispatch)=> {
		dispatch(defaultTransfer());
		fetch(`${API_ADDR}/TRANSFER/1`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			var _res = {

				confirm:res.status,
				size:0
			};
			dispatch(loadTransfer(_res));
		}).catch(err => {
			console.log(err);
		})
	}
}
