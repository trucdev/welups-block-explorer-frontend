export const SIGNUP_INIT = 'SIGNUP_INIT';
export const SIGNUP_UPDATE = 'SIGNUP_UPDATE';

export function initSignUp() {
    return {
        type: SIGNUP_INIT,
    }
}
export function updateSignUp(acc){
    return {
        type: SIGNUP_UPDATE,
        payload: acc
    }
}