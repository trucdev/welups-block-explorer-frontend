import fetch from 'cross-fetch';

import { API_ADDR } from '../config/config';
export const NODES_INIT = 'NODES_INIT';
export const NODES_UPDATE = 'NODES_UPDATE';


export function initNodes() {
	return {
		type: NODES_INIT,
	}
}
export function updateNodes(nodes) {
	return {
		type: NODES_UPDATE,
		payload: nodes
	}
}

export function loadNodes() {
	return (dispatch) => {
		dispatch(initNodes());
		fetch(`${API_ADDR}/nodes`, {
			method: 'GET',
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			dispatch(updateNodes(res));
		}).catch(err => {
			console.log(err);
		})
	}
}