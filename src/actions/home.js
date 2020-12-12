import { API_ADDR } from '../config/config';
import fetch from 'cross-fetch';

export const RECENT_BLOCK_UPDATE = 'RECENT_BLOCK_UPDATE';
export const RECENT_BLOCK_INIT = 'RECENT_BLOCK_INIT';


export function initRecentBlock() {
	return {
		type: RECENT_BLOCK_INIT,
	}
}
export function updateRecentBlock(blocks) {
	return {
		type: RECENT_BLOCK_UPDATE,
		payload: blocks
	}
}

export function loadRecentBlocks() {
	return (dispatch)=> {
		dispatch(initRecentBlock);
		fetch(`${API_ADDR}/blocks/recent`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res=>res.json()).then((res) => {
			dispatch(updateRecentBlock(res));
		}).then(()=>{
			let es = new EventSource(`${API_ADDR}/events/blocks`);
			es.onmessage = (e)=>{
				let blocks  = JSON.parse(e.data);
				dispatch(updateRecentBlock(blocks));
			};
		}).catch(err => {
			console.log(err);
		})
	}
}

export const RECENT_TRAN_UPDATE = 'RECENT_TRAN_UPDATE';
export const RECENT_TRAN_INIT = 'RECENT_TRAN_INIT';


export function updateRecentTrans(trans){
	return {
		type: RECENT_TRAN_UPDATE,
		payload: trans,
	}
}

export function initRecentTrans(){
	return {
		type: RECENT_TRAN_INIT,
	}
}

export function loadRecentTrans() {
	return (dispatch)=> {
		dispatch(initRecentTrans);
		fetch(`${API_ADDR}/transactions/recent`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res=>res.json()).then((res) => {
			dispatch(updateRecentTrans(res));
		}).then(()=>{
			let es = new EventSource(`${API_ADDR}/events/trans`);
			es.onmessage = (e)=>{
				let trans  = JSON.parse(e.data);
				dispatch(updateRecentTrans(trans));
			};
		}).catch(err => {
			console.log(err);
		})
	}
}


export const SYSTEM_STATE_INIT = 'SYSTEM_STATE_INIT';
export const SYSTEM_STATE_UPDATE = 'SYSTEM_STATE_UPDATE';

export function initSystemState(){
	return {
		type: SYSTEM_STATE_INIT
	}
}

export function updateSystemState(systemState){
	return {
		type: SYSTEM_STATE_UPDATE,
		payload: systemState,
	}
}

export function loadSystemState(){
	
	return dispatch => {
		dispatch(initSystemState);
		fetch(`${API_ADDR}/system/state`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res=>res.json()).then((res) => {
			dispatch(updateSystemState(res));
		}).then(()=>{
			let es = new EventSource(`${API_ADDR}/events/system`);
			es.onmessage = (e)=>{
				let systemState  = JSON.parse(e.data);
				dispatch(updateSystemState(systemState));
			};
		}).catch(err => {
			console.log(err);
		})
	}
}