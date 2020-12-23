import { API_ADDR } from '../config/config';
import fetch from 'cross-fetch';

export const CONTRACT_DEFAULT = 'CONTRACT_DEFAULT';
export const CONTRACT_LOAD = 'CONTRACT_LOAD';

export function defaultContract() {
	return {
		type: CONTRACT_DEFAULT,
	}
}

export function loadContract(contract) {
	return {
		type: CONTRACT_LOAD,
		contract:contract
	}
}

export function loadContractApi(addr) {
	return (dispatch)=> {
		dispatch(defaultContract());
		fetch(`${API_ADDR}/contract/${addr}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			var _res = {
				contract_address:res.contract_address,
				name:res.name,
				balance:0,
				transactions:0,
				token_tracker_name:null,
				token_tracker_address:0x0000000000000000000000000000000000000000,
				creation_transaction_address:"0x0000000000000000000000000000000000000000",
				creator_address:res.origin_address,
				creation_time:Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(0),
				available_energy:res.origin_energy_limit,
				energy_ratio_contract:res.consume_contract_resource_percent,
				energy_ratio_user:100-res.consume_contract_resource_percent,
				initial_asset:0
			};
			dispatch(loadContract(_res));
		}).catch(err => {
			console.log(err);
		})
	}
}