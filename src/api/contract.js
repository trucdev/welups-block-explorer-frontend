import { fetch } from 'cross-fetch';
import transaction from './trans';
import { API_ADDR } from '../config/config';
import bytes from "@tronscan/client/src/utils/bytes";
import code from "@tronscan/client/src/lib/code";
import crypto from "@tronscan/client/src/utils/crypto";
import account from './account';
import {CONTRACT_WRITE, CONTRACT_READ} from '../actions/contract';
export default class Contract {
	static async triggerFunction(privateKey, address, method, jsonString, type, t_amount=0, fee_limit=1000000000) {
		try {
			const from = account.addressFromPrivateKey(privateKey);
			var res = null;
			if(type === CONTRACT_READ){
				res = await fetch(`${API_ADDR}/contracts/trigger-constant`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
					body: JSON.stringify({
						"from": from,
						"contract_address": address,
						"method": method,
						"json_string": JSON.stringify(jsonString)
					})
				});
			}else{
				res = await fetch(`${API_ADDR}/contracts/trigger`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
					body: JSON.stringify({
						"from": from,
						"contract_address": address,
						"method": method,
						"json_string": JSON.stringify(jsonString),
						"fee_limit":fee_limit,
						"t_amount":t_amount
					})
				});
			}
			var result = await res.json();
			if (!res.ok || result.status !== "success")
				return false;
			if(result.data.tran_id){
				const signature = bytes.byteArray2hexStr(new Uint8Array(crypto.signBytes(privateKey, code.hexStr2byteArray(result.data.tran_raw_hex))));
				const status = await transaction.broadcast(result.data.tran_hex, result.data.tran_raw_hex, signature);
				result = {tran_id: result.data.tran_id, status:status};
			}
			return result;
		} catch (e) {
			console.log(e);
			return false;
		} 
	}
}