import {BLOCK_TRANSACTION_DEFAULT, BLOCK_LOAD, BLOCK_DEFAULT, BLOCK_TRANSACTION_LOAD} from  '../actions/block';

export function blockReducer(state={}, action){
	switch(action.type){
		case BLOCK_DEFAULT:
			state = defaultBlockState;
			break;
		case BLOCK_LOAD:
			state = action.block;
			break;
	}
	return state;
}

var dataBlock = {
	block_num:0,
	transaction_num:0,
	block_hash:0x0000000000000000000000000000000000000000,
	producer_hash:0x0000000000000000000000000000000000000000,
	producer_name:null,
	parent_hash:0x0000000000000000000000000000000000000000,
	time:Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(0),
	confirm:19,
	size:0
};

const defaultBlockState = dataBlock;

export function blockTransactionReducer(state=[], action){
	switch(action.type){
		case BLOCK_TRANSACTION_LOAD:
			state = action.transacs;
			break;
		case BLOCK_TRANSACTION_DEFAULT:
			state = defaultBlockTransactionState;
			break;
	}
	return state;
}

var dataBlockTransaction = [];

const defaultBlockTransactionState = dataBlockTransaction;

