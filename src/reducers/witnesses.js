import {
	WITNESSES_INIT,
	WITNESSES_UPDATE,
} from '../actions/witnesses';

const initWitnesses = []
// {
// 	address: "",
// 	vote_count: 0,
// 	pub_key: "0",
// 	url: "",
// 	total_produced: 0,
// 	total_missed: 0,
// 	lastest_block_num: 0,
// 	lastest_slot_num: 0,
// 	is_jobs: false
// }
export function witnessesReducer(state = initWitnesses, action) {
	switch (action.type) {
		case WITNESSES_UPDATE:
			return action.payload;
		case WITNESSES_INIT:
			return initWitnesses;
		default:
			return state;
	}
}
