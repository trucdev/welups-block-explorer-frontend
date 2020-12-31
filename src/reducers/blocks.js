import {
	BLOCKS_INIT,
	BLOCKS_UPDATE,
	PAGE_BLOCKS_INIT,
	PAGE_BLOCKS_UPDATE,
	PAGE_BLOCKS_TOTAL_UPDATE,
	PAGE_BLOCKS_LIMIT_UPDATE,
	PAGE_BLOCKS_START_UPDATE
} from '../actions/blocks';

const initBlocks = [];

export function blocksReducer(state = initBlocks, action) {
	switch (action.type) {
		case BLOCKS_UPDATE:
			return action.payload;
		case BLOCKS_INIT:
			return initBlocks;
		default:
			return state;
	}
}

var initPageBlocks = {
	start_page:1,
	start_item:0,
	page_limit:10,
	total_items:10000,
	current_page:1
};

export function pageBlocksReducer(state = initPageBlocks, action) {
	switch (action.type) {
		case PAGE_BLOCKS_UPDATE:
			initPageBlocks.current_page = action.payload;
			initPageBlocks.start_item -= (initPageBlocks.current_page-initPageBlocks.start_page)*initPageBlocks.page_limit;
			initPageBlocks.start_page = action.payload;
			state = initPageBlocks;
			return state;
		case PAGE_BLOCKS_INIT:
			return initPageBlocks;
		case PAGE_BLOCKS_TOTAL_UPDATE:
			initPageBlocks.total_items = action.payload;
			state = initPageBlocks;
			return state;
		case PAGE_BLOCKS_LIMIT_UPDATE:
			initPageBlocks.page_limit = action.payload;
			initPageBlocks.start_page = 1;
			initPageBlocks.start_item = 0;
			initPageBlocks.current_page = 1;
			state = initPageBlocks;
			return state;
		case PAGE_BLOCKS_START_UPDATE:
			initPageBlocks.start_item = action.payload;
			state = initPageBlocks;
			return state;
		default:
			return state;
	}
}