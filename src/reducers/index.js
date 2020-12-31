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
import {contractReducer, contractMenuReducer} from "./contract";
import { witnessesReducer } from "./witnesses";
import { tokensReducer } from "./tokens";
import { pageTokensReducer } from "./tokens";
import { blocksReducer } from "./blocks";
import { pageBlocksReducer } from "./blocks";
import { nodesReducer } from "./nodes";

export default combineReducers({
	search: searchReducer,
	system: homeSystemStateReducer,
	homeBlocks: homeBlockReducer,
	homeTrans: homeTransReducer,
	block: blockReducer,
	blockTransaction:blockTransactionReducer,
	transaction: transactionReducer,
	account: accountReducer,
	contract: contractReducer,
	witnesses:witnessesReducer,
	tokens:tokensReducer,
	nodes:nodesReducer,
	pageTokens:pageTokensReducer,
	contractMenu:contractMenuReducer,
	blocks:blocksReducer,
	pageBlocks:pageBlocksReducer
});