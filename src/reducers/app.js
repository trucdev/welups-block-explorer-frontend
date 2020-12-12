import {MAIN_MENU_CHANGE} from '../actions/app';

const initState ={
	mainMenu: '',
}
export default function appReducer (state = initState, action){
	switch (action.type) {
		case MAIN_MENU_CHANGE:
			return {
				...state,
				mainMenu: action.payload,
			}
		default:
			return state;
	}
}