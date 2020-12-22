import { combineReducers } from 'redux';
import {
	blockReducer,
	blockTransactionReducer,
} from './block';
import {
	homeBlockReducer,
	homeTransReducer,
	homeSystemStateReducer,
	searchReducer,
} from './home';
import { transactionReducer } from "./transaction";
import { accountReducer } from "./account";
import { witnessesReducer } from "./witnesses";

export default combineReducers({
	search: searchReducer,
	system: homeSystemStateReducer,
	homeBlocks: homeBlockReducer,
	homeTrans: homeTransReducer,
	block: blockReducer,
	blockTransaction:blockTransactionReducer,
	transaction: transactionReducer,
	account: accountReducer,
	witnesses:witnessesReducer,
});