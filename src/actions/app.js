export const MAIN_MENU_CHANGE = 'MAIN_MENU_CHANGE';

export function switchMainMenu(newMenuItem) {
	return {
		type: MAIN_MENU_CHANGE,
		payload: newMenuItem,
	}
}
export function chooseNewMainMenu() {
	return dispatch => {
		let path = window.location.pathname.split('/');
		let menuItem = 'home';
		if (path[1] !== '')
			menuItem = path[1];
		dispatch(switchMainMenu(menuItem));
	}
}


