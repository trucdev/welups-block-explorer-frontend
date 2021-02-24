import { notification } from 'antd';
import { API_ADDR } from '../config/config';
import fetch from 'cross-fetch';

export const SEND_TOKEN_NONE = 'SEND_TOKEN_NONE';
export const SEND_TOKEN_REQUESTING = 'SEND_TOKEN_REQUESTING';
export const SEND_TOKEN_SUCCESS = 'SEND_TOKEN_SUCCESS';
export const SEND_TOKEN_FAIL = 'SEND_TOKEN_FAIL';

export function request() {
    return {
        type: SEND_TOKEN_REQUESTING
    };
}
export function fail() {
    return {
        type: SEND_TOKEN_FAIL
    };
}
export function success(status) {
    return {
        type: SEND_TOKEN_SUCCESS,
        payload: status,
    };
}

export function sendToken(email) {
    return async (dispatch) => {
        dispatch(request())
        const res = await fetch(`${API_ADDR}/users/reset-link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            // mode: 'cors',
            body: JSON.stringify({
                email: email,
            })
        });
        const result = await res.json();
        if (!res.ok || result.status !== "success") {
            dispatch(fail());
            notification.error({
                message: 'Failed!',
                description: `This email has not been registered`,
            });
            return
        };
        result.email = email;
        dispatch(success(result));
        notification.success({
            message: 'Success!',
            description: `A verification code has been sent to your email`,
        });
    }
}

export const NEW_PASSWORD_NONE = 'NEW_PASSWORD_NONE';
export const NEW_PASSWORD_REQUESTING = 'NEW_PASSWORD_REQUESTING';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
export const NEW_PASSWORD_FAIL = 'NEW_PASSWORD_FAIL';

export function requestNewPassword() {
    return {
        type: NEW_PASSWORD_REQUESTING
    };
}
export function failNewPassword() {
    return {
        type: NEW_PASSWORD_FAIL
    };
}
export function successNewPassword(status) {
    return {
        type: NEW_PASSWORD_SUCCESS,
        payload: status,
    };
}

export function newPassword(token, password, email) {
    return async (dispatch) => {
        dispatch(request())
        const res = await fetch(`${API_ADDR}/users/password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            mode: 'cors',
            body: JSON.stringify({
                "reset_token": token,
                "new_password": password,
                "email": email,
            })
        });
        const result = await res.json();
        if (!res.ok || result.status !== "success") {
            dispatch(fail());
            notification.error({
                message: 'Failed',
                description: 'Your verification code is invalid'
            });
            return
        };
        dispatch(successNewPassword(result));
        notification.success({
            message: 'Success',
            description: 'Your password has been changed successfully'
        })
    }
}
