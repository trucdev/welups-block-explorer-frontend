import {
    LOGIN_INIT,
    LOGIN_UPDATE,
} from '../actions/login';

const initLogin = false;

export function loginReducer(state = initLogin, action) {
    switch (action.type) {
        case LOGIN_UPDATE:
            return action.payload;
        case LOGIN_INIT:
            return initLogin;
        default:
            return state;
    }
}