import {
	TOKENS_INIT,
	TOKENS_UPDATE,
	PAGE_TOKENS_INIT,
	PAGE_TOKENS_UPDATE,
	PAGE_TOKENS_TOTAL_UPDATE,
	PAGE_TOKENS_LIMIT_UPDATE
} from '../actions/tokens';

const initTokens = [];

export function tokensReducer(state = initTokens, action) {
	switch (action.type) {
		case TOKENS_UPDATE:
			return action.payload;
		case TOKENS_INIT:
			return initTokens;
		default:
			return state;
	}
}

var initPageTokens = {
	start_page:1,
	start_item:0,
	page_limit:10,
	total_items:10000,
	current_page:1
};

export function pageTokensReducer(state = initPageTokens, action) {
	switch (action.type) {
		case PAGE_TOKENS_UPDATE:
			initPageTokens.current_page = action.payload;
			initPageTokens.start_item += (initPageTokens.current_page-initPageTokens.start_page)*initPageTokens.page_limit;
			initPageTokens.start_page = action.payload;
			state = initPageTokens;
			return state;
		case PAGE_TOKENS_INIT:
			return initPageTokens;
		case PAGE_TOKENS_TOTAL_UPDATE:
			initPageTokens.total_items = action.payload;
			state = initPageTokens;
			return state;
		case PAGE_TOKENS_LIMIT_UPDATE:
			initPageTokens.page_limit = action.payload;
			initPageTokens.start_page = 1;
			initPageTokens.start_item = 0;
			initPageTokens.current_page = 1;
			state = initPageTokens;
			return state;
		default:
			return state;
	}
}