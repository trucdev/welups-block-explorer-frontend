import fetch from 'cross-fetch';
import { API_ADDR } from '../config/config';

export const TRANSACTIONS_INIT = 'TRANSACTIONS_INIT';
export const TRANSACTIONS_UPDATE = 'TRANSACTIONS_UDPATE';


export function initTransactions() {
	return {
		type: TRANSACTIONS_INIT,
	}
}
export function updateTransactions(transactions) {
	return {
		type: TRANSACTIONS_UPDATE,
		payload: transactions
	}
}

export function loadTransactions(offset, limit) {
	return (dispatch) => {
		dispatch(initTransactions());
		fetch(`${API_ADDR}/transactions?offset=${offset}&limit=${limit}&sort=desc`, {
			method: 'GET',
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(updateTransactions(res.data));
			if(offset===0){
				dispatch(initPageTransactionsBlock(res.data[0]?res.data[0].blockNumber:0));
			}
		}).catch(err => {
			console.log(err);
		})
	}
}

export const PAGE_TRANSACTIONS_INIT = 'PAGE_TRANSACTIONS_INIT';
export const PAGE_TRANSACTIONS_UPDATE = 'PAGE_TRANSACTIONS_UPDATE';
export const PAGE_TRANSACTIONS_BlOCK_INIT = 'PAGE_TRANSACTIONS_BlOCK_INIT';
export const PAGE_TRANSACTIONS_TOTAL_UPDATE = 'PAGE_TRANSACTIONS_TOTAL_UPDATE';
export const PAGE_TRANSACTIONS_LIMIT_UPDATE = 'PAGE_TRANSACTIONS_LIMIT_UPDATE';
export const PAGE_TRANSACTIONS_START_UPDATE = 'PAGE_TRANSACTIONS_START_UPDATE';

export function initPageTransactions() {
	return {
		type: PAGE_TRANSACTIONS_INIT,
	}
}
export function initPageTransactionsBlock(blockNumber) {
	return {
		type: PAGE_TRANSACTIONS_BlOCK_INIT,
		blockNumber: blockNumber,
	}
}
export function updatePageTransactions(page) {
	return {
		type: PAGE_TRANSACTIONS_UPDATE,
		payload: page,
	}
}

export function updatePageTransactionsTotal(total) {
	return {
		type: PAGE_TRANSACTIONS_TOTAL_UPDATE,
		payload: total
	}
}

export function updatePageTransactionsLimit(limit) {
	return {
		type: PAGE_TRANSACTIONS_LIMIT_UPDATE,
		payload: limit
	}
}
export function updatePageTransactionsStart(start_page) {
	return {
		type: PAGE_TRANSACTIONS_START_UPDATE,
		payload: start_page
	}
}