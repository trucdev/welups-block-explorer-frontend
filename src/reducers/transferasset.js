import {
	TRANSFER_NONE,
	TRANSFER_REQUESTING,
	TRANSFER_SUCCESS,
	TRANSFER_FAIL
} from '../actions/transferasset';

export function transferAssetReducer(state = { status: TRANSFER_NONE, tranID:"", message:"" }, action) {

	switch (action.type) {
		case TRANSFER_NONE:
			state = {status:action.type, message:"", tranID:""}
			break;
		case TRANSFER_REQUESTING:
			state = { status:action.type, message:"Transfer is requesting", tranID:""}
			break;
		case TRANSFER_SUCCESS:
			console.log(action);
			state = {status:action.type, message:"Transfer successed", tranID: action.payload.tranID}
			break;
		case TRANSFER_FAIL:
			state = { status:action.type, message:"Transfer failed", tranID:""}
			break;
		default:
			break;
	}
	return state;
}


