import fetch from 'cross-fetch';
import { API_ADDR } from '../config/config';
import { notification } from 'antd';
import jwt_decode from "jwt-decode";

export const LOGIN_NONE = 'LOGIN_NONE';
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function reset(){
	return {
		type: LOGIN_NONE,
	}
}
export function request(){
	return {
		type:LOGIN_REQUESTING,
	}
}
export function success(status){
	return {
		type: LOGIN_SUCCESS,
		payload: status,
	}
}
export function fail(){
	return {
		type: LOGIN_FAIL,
	}
}

export function checkAccountApi(acc) {
	return async (dispatch) => {
		dispatch(request())
		const res = await fetch(`${API_ADDR}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			mode: 'cors',
			body: JSON.stringify({
				"email": acc.email,
				"password": acc.password,
			})
		});
		const result = await res.json();
		if (!res.ok) {
		};
		switch (result.status) {
			case "success":
				let decoded = jwt_decode(result.data.token);
				result.data.id = decoded.id;
				result.data.email = decoded.email;
				dispatch(success(result.data));
				break;
			case "fail":
				dispatch(fail());
				break;
			case "error":
				notification.error({
					message: 'Log in failed!',
					description: result.message,
				});
				dispatch(fail());
				break;
			default:
				break;
		}

	}
}