import {RECENT_BLOCK_UPDATE,RECENT_BLOCK_INIT, RECENT_TRAN_INIT, RECENT_TRAN_UPDATE, SYSTEM_STATE_INIT, SYSTEM_STATE_UPDATE} from  '../actions/home';

export function homeBlockReducer(state={blocks:[]}, action){
	switch(action.type){
		case RECENT_BLOCK_UPDATE:
			state = {...state, blocks: action.payload};
			break;
		case RECENT_BLOCK_INIT:
			state = {...state, blocks: []};
			break;
	}
	return state;
}

export function homeTransReducer(state={trans:[]}, action){
	switch(action.type){
		case RECENT_TRAN_UPDATE:
			state = {...state, trans: action.payload};
			break;
		case RECENT_TRAN_INIT:
			state = {...state, trans: []};
			break;
	}
	return state;
}
const initSystemState ={
	block_height: 0,
	total_nodes: 0,
	block_num: 0,
	transaction_num: 0
};
export function homeSystemStateReducer(state = {systemState: initSystemState} , action){
	switch (action.type) {
		case SYSTEM_STATE_UPDATE:
			state = {...state, systemState: action.payload};
			break;
		case SYSTEM_STATE_INIT:
			state = {...state, systemState: initSystemState};
			break;
	}
	return state;
}