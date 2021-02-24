import {
    LOGIN_NONE,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_FROM_STORAGE,
    LOGOUT
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
        case LOAD_FROM_STORAGE:
            state = action.payload.tokenDecoded?{ type: action.type, status: "", message: "", description: "", token: action.payload.token, email: action.payload.tokenDecoded.email, id:action.payload.tokenDecoded.id}:{ type: LOGOUT, status: "", message: "", description: "", token: "", email: "", id:""} 
            break;
        case LOGOUT:
            state = { type: action.type, status: "", message: "", description: "", token: "", email: "", id:"" }
            break;
        default:
            break;
    }
    return state;
}
