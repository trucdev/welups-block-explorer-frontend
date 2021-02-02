import {
	DEPLOY_CONTRACT_NONE,
	DEPLOY_CONTRACT_REQUESTING,
	DEPLOY_CONTRACT_SUCCESS,
	DEPLOY_CONTRACT_FAIL
} from '../actions/deployContract';

const initState = { status: DEPLOY_CONTRACT_NONE, tranID: "", message: "" }

export function deployContractReducer(state = initState, action) {
	switch (action.type) {
		case DEPLOY_CONTRACT_NONE:
			state = { status: action.type, message: "", tranID: "" }
			break;
		case DEPLOY_CONTRACT_REQUESTING:
			state = { status: action.type, message: "Deploy Contract is requesting", tranID: "" }
			break;
		case DEPLOY_CONTRACT_SUCCESS:
			state = { status: action.type, message: "Deployment successed", tranID: action.payload.tranID }
			break;
		case DEPLOY_CONTRACT_FAIL:
			state = { status: action.type, message: "Deployment failed", tranID: "" }
			break;
		default:
			break;
	}
	return state;
}
