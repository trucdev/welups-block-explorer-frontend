import fetch from 'cross-fetch';
import {API_ADDR} from '../config/config';

export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_UPDATE = 'LOGIN_UPDATE';

export function initLogin() {
    return {
        type: LOGIN_INIT,
    }
}
export function updateLogin(status){
    return {
        type: LOGIN_UPDATE,
        payload: status
    }
}

export function checkAccountApi(acc) {
	return (dispatch)=> {
		fetch(`${API_ADDR}/block/common/1`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			var password = "admin";
			if(acc.password===password){
				dispatch(updateLogin(true));
			}
		}).catch(err => {
			console.log(err);
		})
	}
}