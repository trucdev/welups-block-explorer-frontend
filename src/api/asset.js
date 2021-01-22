import { fetch } from 'cross-fetch';
import transaction from './trans';
import { API_ADDR } from '../config/config';
import bytes from "@tronscan/client/src/utils/bytes";
import code from "@tronscan/client/src/lib/code";
import crypto from "@tronscan/client/src/utils/crypto";
import account from './account';
export default class Asset {
	static async transfer(privateKey, to, amount, assetName = 'ACG') {
		try {
			const from = account.addressFromPrivateKey(privateKey);
			const res = await fetch(`${API_ADDR}/assets/transfer`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				body: JSON.stringify({
					"from": from,
					"to": to,
					"amount": amount,
					"asset_name": assetName
				})
			});
			if (!res.ok)
				return { tranID: '', result: false };
			const result = await res.json();
			const signature = bytes.byteArray2hexStr(new Uint8Array(crypto.signBytes(privateKey, code.hexStr2byteArray(result.data.tran_raw_hex))));
			const status = await transaction.broadcast(result.data.tran_hex, result.data.tran_raw_hex, signature);
			return { tranID: result.data.tran_id, result: status }
		} catch (e) {
			console.log(e);
			return { tranID: '', result: false };
		}
	}
}