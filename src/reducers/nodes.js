import {
	NODES_INIT,
	NODES_UPDATE,
} from '../actions/nodes';

const initNodes = []
export function nodesReducer(state = initNodes, action) {
	switch (action.type) {
		case NODES_UPDATE:
			return action.payload;
		case NODES_INIT:
			return initNodes;
		default:
			return state;
	}
}
