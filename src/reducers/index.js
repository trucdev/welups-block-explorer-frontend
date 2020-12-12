import { combineReducers } from 'redux';
import {homeBlockReducer, homeTransReducer, homeSystemStateReducer} from './home';
import appReducer from './app';
export default combineReducers({
	system: homeSystemStateReducer,
	homeBlocks: homeBlockReducer,
	homeTrans:homeTransReducer,
	app: appReducer,
});