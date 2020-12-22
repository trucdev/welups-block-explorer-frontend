import { combineReducers } from 'redux';
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
	transaction: transactionReducer,
	account: accountReducer,
	witnesses:witnessesReducer,
});