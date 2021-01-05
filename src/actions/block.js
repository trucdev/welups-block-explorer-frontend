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
		fetch(`${API_ADDR}/block/common/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			var _res = {
				block_num:res.num,
				transaction_num:res.transactions,
				block_hash:res.hash,
				producer_hash:res.producer.hash,
				producer_name:res.producer.name,
				parent_hash:res.parent_hash,
				time:Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(res.timestamp),
				confirm:res.status,
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
			dispatch(loadBlockTransaction(res));
		}).catch(err => {
			console.log(err);
		})
	}
}
