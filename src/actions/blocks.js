import fetch from 'cross-fetch';

import { API_ADDR } from '../config/config';
export const BLOCKS_INIT = 'BLOCKS_INIT';
export const BLOCKS_UPDATE = 'BLOCKS_UPDATE';


export function initBlocks() {
	return {
		type: BLOCKS_INIT,
	}
}
export function updateBlocks(blocks) {
	return {
		type: BLOCKS_UPDATE,
		payload: blocks
	}
}

export function loadBlocks(offset, limit) {
	limit=offset>=limit?limit:offset;
	return (dispatch) => {
		dispatch(initBlocks());
		fetch(`${API_ADDR}/blocks?num=${offset}&limit=${limit}&sort=desc`, {
			method: 'GET',
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			if(offset===0){
				dispatch(updatePageBlocksTotal(res.data[0].num+1));
				dispatch(updatePageBlocksStart(res.data[0].num));
			}
			dispatch(updateBlocks(res.data));
		}).catch(err => {
			console.log(err);
		})
	}
}

export const PAGE_BLOCKS_INIT = 'PAGE_BLOCKS_INIT';
export const PAGE_BLOCKS_UPDATE = 'PAGE_BLOCKS_UPDATE';
export const PAGE_BLOCKS_TOTAL_UPDATE = 'PAGE_BLOCKS_TOTAL_UPDATE';
export const PAGE_BLOCKS_LIMIT_UPDATE = 'PAGE_BLOCKS_LIMIT_UPDATE';
export const PAGE_BLOCKS_START_UPDATE = 'PAGE_BLOCKS_START_UPDATE';

export function initPageBlocks() {
	return {
		type: PAGE_BLOCKS_INIT,
	}
}
export function updatePageBlocks(page) {
	return {
		type: PAGE_BLOCKS_UPDATE,
		payload: page
	}
}

export function updatePageBlocksTotal(total) {
	return {
		type: PAGE_BLOCKS_TOTAL_UPDATE,
		payload: total
	}
}

export function updatePageBlocksLimit(limit) {
	return {
		type: PAGE_BLOCKS_LIMIT_UPDATE,
		payload: limit
	}
}

export function updatePageBlocksStart(start_page) {
	return {
		type: PAGE_BLOCKS_START_UPDATE,
		payload: start_page
	}
}