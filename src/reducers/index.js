import { combineReducers } from 'redux';
import {
	homeBlockReducer,
	homeTransReducer,
	homeSystemStateReducer,
	searchReducer,
} from './home';

export default combineReducers({
	search: searchReducer,
	system: homeSystemStateReducer,
	homeBlocks: homeBlockReducer,
	homeTrans: homeTransReducer,
});