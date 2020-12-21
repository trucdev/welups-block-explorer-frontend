import fetch from 'cross-fetch';

import { API_ADDR } from '../config/config';
export const TRANSACTION_DETAIL_INIT = 'TRANSACTION_DETAIL_INIT';
export const TRANSACTION_DETAIL_UDPATE = 'TRANSACTION_DETAIL_UDPATE';


export function initTransactionDetail() {
	return {
		type: TRANSACTION_DETAIL_INIT,
	}
}
export function updateTransactionDetails(tran) {
	return {
		type: TRANSACTION_DETAIL_UDPATE,
		payload: tran
	}
}

export function loadTransactionDetails(txHash) {
	return (dispatch) => {
		dispatch(initTransactionDetail());
		fetch(`${API_ADDR}/transactions/${txHash}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(updateTransactionDetails(res));
		}).catch(err => {
			console.log(err);
		})
	}
}