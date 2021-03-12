import { API_ADDR } from '../config/config';
import fetch from 'cross-fetch';

export const BLOCK_DEFAULT = 'BLOCK_DEFAULT';
export const BLOCK_LOAD = 'BLOCK_LOAD';

export function defaultBlock() {
	return {
		type: BLOCK_DEFAULT,
	}
}

export function loadBlock(block) {
	return {
		type: BLOCK_LOAD,
		block:block
	}
}

export function loadBlockApi(id) {
	return (dispatch)=> {
		dispatch(defaultBlock());
		fetch(`${API_ADDR}/blocks/${id}/common`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			var _res = {
				block_num:res.data.num,
				transaction_num:res.data.num_of_txs,
				block_hash:res.data.hash,
				producer_hash:res.data.witness_address,
				producer_name:res.data.witness_name,
				parent_hash:res.data.parent_hash,
				time:res.data.timestamp,
				confirm:res.data.confirmed,
				size:0
			};
			dispatch(loadBlock(_res));
		}).catch(err => {
			console.log(err);
		})
	}
}

export const BLOCK_TRANSACTION_DEFAULT = 'BLOCK_TRANSACTION_DEFAULT';
export const BLOCK_TRANSACTION_LOAD = 'BLOCK_TRANSACTION_LOAD';


export function defaultBlockTransaction() {
	return {
		type: BLOCK_TRANSACTION_DEFAULT,
	}
}

export function loadBlockTransaction(transacs) {
	return {
		type: BLOCK_TRANSACTION_LOAD,
		transacs:transacs
	}
}

export function loadBlockTransactionApi(id) {
	return (dispatch)=> {
		dispatch(defaultBlockTransaction());
		fetch(`${API_ADDR}/blocks/${id}/transactions`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(loadBlockTransaction(res.data));
		}).catch(err => {
			console.log(err);
		})
	}
}
