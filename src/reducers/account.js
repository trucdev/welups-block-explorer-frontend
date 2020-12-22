import {
	ACCOUNT_DETAIL_INIT,
	ACCOUNT_DETAIL_UDPATE,
} from '../actions/account';

const initAcc = {
	name: "",
	address: "",
	totalBalance: 0,
	trxBalance:0,
	transactions:0,
	transferred:0,
	availableBalance:0,
	netUsage:0,
	bandwidthUsed:0,
	bandwidthTotal:0,
	createTime:0,
	frozenBalance: 0,
	energyTotal:0,
	energyUsed:0,
	asset:{}
}

export function accountReducer(state = initAcc, action) {
	switch (action.type) {
		case ACCOUNT_DETAIL_UDPATE:
			return {
				...state,
				name: action.payload.name,
				address: action.payload.address,
				totalBalance:action.payload.totalBalance,
				trxBalance:action.payload.trxBalance,
				transactions:action.payload.transactions,
				transferred:action.payload.transferred,
				availableBalance:action.payload.available_balance,
				netUsage:action.payload.netUsage,
				bandwidthUsed:action.payload.bandwidthUsed,
				bandwidthTotal:action.payload.bandwidthTotal,
				createTime:action.payload.create_time,
				frozenBalance:action.payload.frozen_balance,
				energyTotal:action.payload.energy_total,
				energyUsed:action.payload.energy_used,
				asset:action.payload.asset||{},
			};
		case ACCOUNT_DETAIL_INIT:
			return initAcc;
		default:
			return state;

	}
}
