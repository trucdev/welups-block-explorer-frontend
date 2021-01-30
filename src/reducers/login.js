import {
    LOGIN_NONE,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/login';

export function loginReducer(state = { type: LOGIN_NONE, status: "", message: "", description: "", token: "", id: "", email: ""}, action) {
    switch (action.type) {
        case LOGIN_NONE:
            state = { type: action.type, status: "", message: "", description: "", token: "", email: "", id:"" }
            break;
        case LOGIN_REQUESTING:
            state = { type: action.type, status: "login is requesting", message: "", description: "", token: "", email: "", id:"" }
            break;
        case LOGIN_SUCCESS:
            state = { type: action.type, status: "success", message: "successed", description: "", token: action.payload.token, email: action.payload.email, id: action.payload.id}
            break;
        case LOGIN_FAIL:
            state = { type: action.type, status: "fail", message: "failed", description: "user or password invalid", token: "", email: "", id:""} 
            break;
    }
    return state;
}
