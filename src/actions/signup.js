import { notification } from 'antd';
import fetch from 'cross-fetch';
import { API_ADDR } from '../config/config';
export const SIGNUP_NONE = 'SIGNUP_NONE';
export const SIGNUP_REQUESTING = 'SIGNUP_REQUESTING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export function request() {
    return { type: SIGNUP_REQUESTING }
}
export function success() {
    return {
        type: SIGNUP_SUCCESS
    }
}
export function fail() {
    return { type: SIGNUP_FAIL }
}
export function reset() {
    return { type: SIGNUP_NONE }
}


export function signUp(email, password) {
    return async (dispatch) => {
        dispatch(request());
        const res = await fetch(`${API_ADDR}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            mode: 'cors',
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        });
        const result = await res.json();
        if (!res.ok || result.status !== "success") {
            dispatch(fail());
            notification.error({
                message: 'Failed!',
                description: `Sign up failed`,
            });
            return
        };
        dispatch(success());
        notification.success({
            message: 'Success!',
            description: `Your account has been created`,
        });
    }
}