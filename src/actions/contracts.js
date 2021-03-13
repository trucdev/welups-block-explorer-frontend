import fetch from 'cross-fetch';

import { API_ADDR } from '../config/config';
export const CONTRACTS_INIT = 'CONTRACTS_INIT';
export const CONTRACTS_UPDATE = 'CONTRACTS_UPDATE';


export function initContracts() {
	return {
		type: CONTRACTS_INIT,
	}
}
export function updateContracts(contracts) {
	return {
		type: CONTRACTS_UPDATE,
		payload: contracts
	}
}

export function loadContracts(offset, limit) {
	return (dispatch) => {
		fetch(`${API_ADDR}/contracts?offset=${offset}&limit=${limit}`, {
			method: 'GET',
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(updatePageContractsTotal(res.data.total));
			dispatch(updateContracts(res.data.contracts));
		}).catch(err => {
			console.log(err);
		})
	}
}

export const PAGE_CONTRACTS_INIT = 'PAGE_CONTRACTS_INIT';
export const PAGE_CONTRACTS_UPDATE = 'PAGE_CONTRACTS_UPDATE';
export const PAGE_CONTRACTS_TOTAL_UPDATE = 'PAGE_CONTRACTS_TOTAL_UPDATE';
export const PAGE_CONTRACTS_LIMIT_UPDATE = 'PAGE_CONTRACTS_LIMIT_UPDATE';

export function initPageContracts() {
	return {
		type: PAGE_CONTRACTS_INIT,
	}
}
export function updatePageContracts(page) {
	return {
		type: PAGE_CONTRACTS_UPDATE,
		payload: page
	}
}

export function updatePageContractsTotal(total) {
	return {
		type: PAGE_CONTRACTS_TOTAL_UPDATE,
		payload: total
	}
}

export function updatePageContractsLimit(limit) {
	return {
		type: PAGE_CONTRACTS_LIMIT_UPDATE,
		payload: limit
	}
}