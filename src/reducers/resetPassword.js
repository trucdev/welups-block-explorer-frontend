import { 
    SEND_TOKEN_NONE,
    SEND_TOKEN_REQUESTING,
    SEND_TOKEN_SUCCESS,
    SEND_TOKEN_FAIL,
    NEW_PASSWORD_NONE,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    NEW_PASSWORD_REQUESTING
} from '../actions/resetPassword';

export function sendTokenReducer (state = { type: SEND_TOKEN_NONE, status: "", message: "", description: "", email: ""}, action) {
    switch (action.type) {
        case SEND_TOKEN_NONE:
            state = { type: action.type, status: "", message: "", description: "", email: ""}
            break;
        case SEND_TOKEN_REQUESTING:
            state = { type: action.type, status: "requesting", message: "", description: "", email: ""}
            break;
        case SEND_TOKEN_SUCCESS:
            state = { type: action.type, status: "success", message: "successed", description: "", email: action.payload.email}
            break;
        case SEND_TOKEN_FAIL:
            state = { type: action.type, status: "fail", message: "failed", description: "", email: ""}
            break;
    }
    return state;
}


export function newPasswordReducer(state = {type: NEW_PASSWORD_NONE, status: ""}, action) {
    switch (action.type) {
        case NEW_PASSWORD_NONE:
            state = { type: action.type, status: ""}
            break;
        case NEW_PASSWORD_REQUESTING:
            state = { type: action.type, status: "requesting"};
            break;
        case NEW_PASSWORD_SUCCESS:
            state = { type: action.type, status: "success"};
            break;
        case NEW_PASSWORD_FAIL:
            state = { type: action.type, status: "fail"};
            break;
        default:
            break;
    }
    return state;
}