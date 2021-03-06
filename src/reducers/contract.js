import {CONTRACT_LOAD, CONTRACT_DEFAULT, PRI_KEY_UPDATE, RESULT_DEFAULT, RESULT_UPDATE} from  '../actions/contract';

export function contractReducer(state=defaultContractState, action){
	switch(action.type){
		case CONTRACT_DEFAULT:
			state = defaultContractState;
			break;
		case CONTRACT_LOAD:
			state = action.contract;
			break;
		case PRI_KEY_UPDATE:
			state = {...state, prikey: action.payload};
			break;
		case RESULT_UPDATE:
			state = {...state, result: action.payload};
			break;
		case RESULT_DEFAULT:
			state = {...state, result:{}};
			break;
		default:
			break;
	}
	return state;
}

var dataContract = {
	contract_address:0x0000000000000000000000000000000000000000,
	name:null,
	balance:0,
	transactions:0,
	token_tracker_name:null,
	token_tracker_address:0x0000000000000000000000000000000000000000,
	creation_transaction_address:"0x0000000000000000000000000000000000000000",
	creator_address:0x0000000000000000000000000000000000000000,
	creation_time:Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(0),
	available_energy:0,
	energy_ratio_contract:0,
	energy_ratio_user:0,
	initial_asset:0,
	abi:null,
	bytecode:null,
	assets:null,
	prikey:"",
	result:{}
};

const defaultContractState = dataContract;


