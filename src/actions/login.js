import fetch from 'cross-fetch';
import { API_ADDR } from '../config/config';
import { notification } from 'antd';
import jwt_decode from "jwt-decode";
export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_UPDATE = 'LOGIN_UPDATE';

export function initLogin() {
	return {
		type: LOGIN_INIT,
	}
}
export function updateLogin(status) {
	return {
		type: LOGIN_UPDATE,
		payload: status
	}
}

export function checkAccountApi(acc) {
	return async (dispatch) => {
		const res = await fetch(`${API_ADDR}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			mode: 'cors',
			body: JSON.stringify({
				"email": acc.email,
				"password": acc.password
			})
		});
		if (!res.ok) return;
		const result = await res.json();
		switch (result.status) {
			case "success":
				let decoded = jwt_decode(result.data.token);
				result.data.id = decoded.id;
				result.data.email = decoded.email;
				dispatch(updateLogin(result.data));
				break;
			case "fail":
			case "error":
				notification.error({
					message: 'Log in failed!',
					description: res.message,
				});
				break;
			default:
				break;
		}
	}
}