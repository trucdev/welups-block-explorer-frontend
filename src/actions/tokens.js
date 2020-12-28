import fetch from 'cross-fetch';

import { API_ADDR } from '../config/config';
export const TOKENS_INIT = 'TOKENS_INIT';
export const TOKENS_UPDATE = 'TOKENS_UPDATE';


export function initTokens() {
	return {
		type: TOKENS_INIT,
	}
}
export function updateTokens(tokens) {
	return {
		type: TOKENS_UPDATE,
		payload: tokens
	}
}

export function loadTokens(offset, limit) {
	return (dispatch) => {
		dispatch(initTokens());
		fetch(`${API_ADDR}/assets?offset=${offset}&limit=${limit}`, {
			method: 'GET',
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(updatePageTokensTotal(res[0].total_assets));
			dispatch(updateTokens(res));
		}).catch(err => {
			console.log(err);
		})
	}
}

export const PAGE_TOKENS_INIT = 'PAGE_TOKENS_INIT';
export const PAGE_TOKENS_UPDATE = 'PAGE_TOKENS_UPDATE';
export const PAGE_TOKENS_TOTAL_UPDATE = 'PAGE_TOKENS_TOTAL_UPDATE';
export const PAGE_TOKENS_LIMIT_UPDATE = 'PAGE_TOKENS_LIMIT_UPDATE';

export function initPageTokens() {
	return {
		type: PAGE_TOKENS_INIT,
	}
}
export function updatePageTokens(page) {
	return {
		type: PAGE_TOKENS_UPDATE,
		payload: page
	}
}

export function updatePageTokensTotal(total) {
	return {
		type: PAGE_TOKENS_TOTAL_UPDATE,
		payload: total
	}
}

export function updatePageTokensLimit(limit) {
	return {
		type: PAGE_TOKENS_LIMIT_UPDATE,
		payload: limit
	}
}