import { API_ADDR } from '../config/config';
import fetch from 'cross-fetch';
import Contract from '../api/contract';
import { notification } from 'antd';

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
		fetch(`${API_ADDR}/contracts/${addr}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(res => res.json()).then((res) => {
			var _res = {
				contract_address:res.data.contract_address,
				name:res.data.name,
				balance:res.data.balance?res.data.balance:0,
				transactions:0,
				token_tracker_name:null,
				token_tracker_address:0x0000000000000000000000000000000000000000,
				creation_transaction_address:"0x0000000000000000000000000000000000000000",
				creator_address:res.data.origin_address,
				creation_time:Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(0),
				available_energy:res.data.origin_energy_limit,
				energy_ratio_contract:res.data.consume_contract_resource_percent,
				energy_ratio_user:100-res.data.consume_contract_resource_percent,
				initial_asset:0,
				abi:res.data.abi.entrys,
				bytecode:res.data.bytecode,
				assets:res.data.assets
			};
			dispatch(loadContract(_res));
		}).catch(err => {
			console.log(err);
		})
	}
}

export const PRI_KEY_UPDATE = 'PRI_KEY_UPDATE';

export function updatePriKey(key) {
	return {
		type: PRI_KEY_UPDATE,
		payload:key
	}
}

export const RESULT_DEFAULT = 'RESULT_DEFAULT';
export const RESULT_UPDATE = 'RESULT_UPDATE';
export const CONTRACT_READ = 'CONTRACT_READ';
export const CONTRACT_WRITE = 'CONTRACT_WRITE';

export function defaultResult() {
	return {
		type: RESULT_DEFAULT,
	}
}

export function updateResult(res) {
	return {
		type: RESULT_UPDATE,
		payload:res
	}
}

export function triggerSmartContract(no, privateKey, address, method, jsonString, outputs, type, t_amount=0){
	return async (dispatch)=> {
		dispatch(defaultResult());
		var res = await Contract.triggerFunction(privateKey, address, method, jsonString, type, t_amount);
		if (res===false){
			notification.error({
				message: 'Failed!',
				description: `Trigger has failed`,
			});
			return
		}
		//Success
		if(res.tran_id){
			
		}else{
			res.data = convertResult(res.data.contract_results, outputs);
		}
		res.no = no;
		res.type = type;
		dispatch(updateResult(res)); 
	}
}

function convert(value, type){
    if(type.includes("uint")){
        value = parseInt(value);
    }else if(type==="address"){
        value = window.tronWeb.address.fromHex(value);
    }else if(type==="bool"){
        value = value.toString();
    }
    return value;
}
function convertResult(result, type){
    var res = [];
    if(type.length===1){
        res.push(convert(result, type[0].type));
    }else{
        type.map((typ, index)=>{
            res.push(convert(result[index], typ.type));
            return null;
        });
    }
    return res;
}

