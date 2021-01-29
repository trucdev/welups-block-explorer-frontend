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

export const CONTRACT_DEFAULT_MENU = 'CONTRACT_DEFAULT_MENU';
export const CONTRACT_MENU_UPDATE = 'CONTRACT_MENU_UPDATE';

export function defaultContractMenu() {
	return {
		type: CONTRACT_DEFAULT_MENU,
	}
}

export function updateContractMenu(menuItem) {
	return {
		type: CONTRACT_MENU_UPDATE,
		menuItem:menuItem
	}
}

function convert(value, type){
	if(type.includes("uint")){
		value = window.tronWeb.toDecimal(value._hex);
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

export async function triggerWriteFunc(params, func, addr, value){
    const trc20ContractAddress = addr;//contract address
    var result;
    try {
        let contract = await window.tronWeb.contract().at(trc20ContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        if(value){
        	result = await contract.methods.[func.name].apply(null, params).send({callValue:value});
        }else{
        	result = await contract.methods.[func.name].apply(null, params).send();
        }
        result = convertResult(result, func.outputs);
        if(result.length!==1&&result.length!==0){
        	result = JSON.stringify(result);
        }
    } catch(error) {
    	result = JSON.stringify(error);
    }
    return result;
}

export async function triggerReadFunc(params, func, addr){
    const trc20ContractAddress = addr;//contract address
    var result;
    try {
        let contract = await window.tronWeb.contract().at(trc20ContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        result = await contract.methods.[func.name].apply(null, params).call();
        result = convertResult(result, func.outputs);
        if(result.length!==1&&result.length!==0){
        	result = JSON.stringify(result);
        }
    } catch(error) {
    	result = JSON.stringify(error);
    }
    return result;
}
