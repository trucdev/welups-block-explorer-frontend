import {
    SIGNUP_NONE,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_REQUESTING,
} from '../actions/signup';

const initSignUp = {
    status: SIGNUP_NONE
}

export function signUpReducer(state = initSignUp, action) {
    switch (action.type) {
        case SIGNUP_NONE:
            state = initSignUp;
            break;
        case SIGNUP_REQUESTING:
            state = { status: SIGNUP_REQUESTING };
            break;
        case SIGNUP_SUCCESS:
            state = { status: SIGNUP_SUCCESS };
            break;
        case SIGNUP_FAIL:
            state = { status: SIGNUP_FAIL };
            break;
        default:
            break;
    }
    return state;
}