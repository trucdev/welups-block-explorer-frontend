import {
	TRANSACTIONS_INIT,
	TRANSACTIONS_UPDATE,
	PAGE_TRANSACTIONS_INIT,
	PAGE_TRANSACTIONS_UPDATE,
	PAGE_TRANSACTIONS_TOTAL_UPDATE,
	PAGE_TRANSACTIONS_LIMIT_UPDATE,
	PAGE_TRANSACTIONS_START_UPDATE,
	PAGE_TRANSACTIONS_BlOCK_INIT,
} from '../actions/transactions';

const initTransactions = [];

export function transactionsReducer(state = initTransactions, action) {
	switch (action.type) {
		case TRANSACTIONS_UPDATE:
			return action.payload;
		case TRANSACTIONS_INIT:
			return initTransactions;
		default:
			return state;
	}
}

var initPageTransactions = {
	start_page: 1,
	start_item: -1,
	page_limit: 5,
	total_items: 5000,
	current_page: 1,
};



export function pageTransactionsReducer(state = initPageTransactions, action) {
	switch (action.type) {
		case PAGE_TRANSACTIONS_BlOCK_INIT:
			initPageTransactions.start_item = action.blockNumber;
			state = initPageTransactions;
			return state;
			
		case PAGE_TRANSACTIONS_UPDATE:
			initPageTransactions.current_page = action.payload;
			initPageTransactions.start_item -= initPageTransactions.page_limit* (initPageTransactions.current_page - initPageTransactions.start_page) ;
			initPageTransactions.start_page = action.payload;
			initPageTransactions.total_items += initPageTransactions.current_page  % 500 === 0 ? 5000 : 0;
			state = initPageTransactions;
			return state;
		case PAGE_TRANSACTIONS_INIT:
			return initPageTransactions;
		case PAGE_TRANSACTIONS_TOTAL_UPDATE:
			initPageTransactions.total_items = action.payload;
			state = initPageTransactions;
			return state;
		case PAGE_TRANSACTIONS_LIMIT_UPDATE:
			initPageTransactions.page_limit = action.payload;
			initPageTransactions.start_page = 1;
			initPageTransactions.start_item = 0;
			initPageTransactions.current_page = 1;
			state = initPageTransactions;
			return state;
		case PAGE_TRANSACTIONS_START_UPDATE:
			initPageTransactions.start_item = action.payload;
			state = initPageTransactions;
			return state;
		default:
			return state;
	}
}