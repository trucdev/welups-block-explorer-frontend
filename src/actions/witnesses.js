import fetch from 'cross-fetch';

import { API_ADDR } from '../config/config';
export const WITNESSES_INIT = 'WITNESSES_INIT';
export const WITNESSES_UPDATE = 'WITNESSES_UPDATE';


export function initWitnesses() {
	return {
		type: WITNESSES_INIT,
	}
}
export function updateWitnesses(witnesses) {
	return {
		type: WITNESSES_UPDATE,
		payload: witnesses
	}
}

export function loadWitnesses() {
	return (dispatch) => {
		dispatch(initWitnesses());
		fetch(`${API_ADDR}/witness`, {
			method: 'GET',
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(updateWitnesses(res));
		}).catch(err => {
			console.log(err);
		})
	}
}