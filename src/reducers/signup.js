import {
    SIGNUP_INIT,
    SIGNUP_UPDATE,
} from '../actions/signup';

const initSignUp = {}

export function signUpReducer(state = initSignUp, action) {
    switch (action.type) {
        case SIGNUP_UPDATE:
            return action.payload;
        case SIGNUP_INIT:
            return initSignUp;
        default:
            return state;
    }
}