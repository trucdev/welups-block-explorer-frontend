import {
	ACCOUNT_DETAIL_INIT,
	ACCOUNT_DETAIL_UDPATE,
} from '../actions/account';

const initTran = {
	address: "",
    totalBalance: 0,
    trxBalance: 0,
	createdTime: 0,
	freezeBalance: 0,
	bandwidthLimit: 0,
	usedBandwidth: 0,
	energy:0,

}
export function accountReducer(state = initTran, action) {
	switch (action.type) {
		case ACCOUNT_DETAIL_UDPATE:
			return {
				...state,
				address: action.payload.address,
				totalBalance: action.payload.totalBalance,
				trxBalance: action.payload.trxBalance,
				createdTime: action.payload.create_time,
			};
		case ACCOUNT_DETAIL_INIT:
			return initTran;
		default:
			return state;

	}
}
