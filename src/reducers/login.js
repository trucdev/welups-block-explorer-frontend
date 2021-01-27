import {
    LOGIN_INIT,
    LOGIN_UPDATE,
} from '../actions/login';

const initLogin = {
    status: false,
    token: ""
};

export function loginReducer(state = initLogin, action) {
    switch (action.type) {
        case LOGIN_UPDATE:
            return {
                ...state,
                status: action.payload != "",
                token: action.payload.token,
                id: action.payload.id,
                email: action.payload.email,
            };
        case LOGIN_INIT:
            return initLogin;
        default:
            return state;
    }
}