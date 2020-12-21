import { combineReducers } from 'redux';
import {
	homeBlockReducer,
	homeTransReducer,
	homeSystemStateReducer,
	searchReducer,

} from './home';
import { transactionReducer } from "./transaction";
import { accountReducer } from "./account";

export default combineReducers({
	search: searchReducer,
	system: homeSystemStateReducer,
	homeBlocks: homeBlockReducer,
	homeTrans: homeTransReducer,
	transaction: transactionReducer,
	account: accountReducer,
});