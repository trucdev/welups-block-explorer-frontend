import {
	DEPLOY_CONTRACT_NONE,
	DEPLOY_CONTRACT_REQUESTING,
	DEPLOY_CONTRACT_SUCCESS,
	DEPLOY_CONTRACT_FAIL,
	COMPILE_CONTRACT_SUCCESS,
	COMPILE_CONTRACT_FAIL,
	UPLOAD_CONTRACT
} from '../actions/deployContract';

const initState = { status: DEPLOY_CONTRACT_NONE, tranID: "", message: "", contract: "", infos:"" }

export function deployContractReducer(state = initState, action) {
	switch (action.type) {
		case DEPLOY_CONTRACT_NONE:
			state = { status: action.type, message: "", tranID: "", contract: "", infos:"" }
			break;
		case DEPLOY_CONTRACT_REQUESTING:
			state = { ...state, status: action.type, message: "Deploy Contract is requesting"}
			break;
		case DEPLOY_CONTRACT_SUCCESS:
			state = { ...state, status: action.type, message: "Deployment successed", tranID: action.payload.tranID}
			break;
		case DEPLOY_CONTRACT_FAIL:
			state = { ...state, status: action.type, message: "Deployment failed", tranID: ""}
			break;
		case COMPILE_CONTRACT_SUCCESS:
			state = { ...state, status: action.type, message: "Compile successed", infos:action.payload }
			break;
		case COMPILE_CONTRACT_FAIL:
			state = { ...state, status: action.type, message: "Compile failed", infos:"" }
			break;
		case UPLOAD_CONTRACT:
			state = { ...state, status: action.type, contract:action.payload, infos:"" }
			break;
		default:
			break;
	}
	return state;
}
